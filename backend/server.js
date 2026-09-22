import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEADS_FILE = path.join(__dirname, "leads.json");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

// Basic protection against form/chat spam or abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests. Please try again later." },
});
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many messages. Please slow down." },
});

async function readLeads() {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function appendLead(lead) {
  const leads = await readLeads();
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

function buildTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "vps140608.inmotionhosting.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Emails + saves a captured lead, whichever channel it came from
 * (the contact form or a Mr. Livo chat conversation).
 *
 * NOTIFY_EMAIL_CC is a private, internal recipient (e.g. a personal inbox
 * that should also see every lead). It is only ever read from this
 * server-side .env file — it is never sent to the browser, never appears
 * in any HTML/JS the frontend ships, and is not shown anywhere visible
 * on the site. Keep it out of frontend code and out of version control
 * (the real .env is gitignored; only .env.example ships with placeholders).
 */

async function notifyLead(lead) {
  await appendLead(lead);

  if (!transporter || !process.env.NOTIFY_EMAIL_TO) return;

  const to = process.env.NOTIFY_EMAIL_TO;
  const bcc = process.env.NOTIFY_EMAIL_CC || undefined;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    bcc,
    replyTo: lead.email || undefined,
    subject: `New Pilot lead: ${lead.name} (${lead.company || lead.source})`,
    text: [
      `Source: ${lead.source}`,
      `Name: ${lead.name}`,
      `Company: ${lead.company || "-"}`,
      `Phone: ${lead.phone || "-"}`,
      `Email: ${lead.email || "-"}`,
      `Language: ${lead.lang}`,
      `Message: ${lead.message || "-"}`,
      `Received: ${lead.receivedAt}`,
    ].join("\n"),
  });
}


function validateLead(body) {
  const errors = [];
  const { name, company, phone, email } = body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required");
  }
  if (!company || typeof company !== "string" || company.trim().length < 2) {
    errors.push("company is required");
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
    errors.push("phone is required");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("email is invalid");
  }
  return errors;
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "pilot-landing-backend" });
});

// -------------------- Contact form --------------------

app.post("/api/contact", contactLimiter, async (req, res) => {
  const errors = validateLead(req.body);
  if (errors.length) {
    return res.status(400).json({ ok: false, errors });
  }

  const lead = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    receivedAt: new Date().toISOString(),
    name: req.body.name.trim(),
    company: req.body.company.trim(),
    phone: req.body.phone.trim(),
    email: (req.body.email || "").trim(),
    message: (req.body.message || "").trim(),
    lang: req.body.lang === "en" ? "en" : "ar",
    source: "contact-form",
  };

  try {
    await notifyLead(lead);
    return res.status(201).json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("Failed to save/send lead:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

// Simple, key-protected read endpoint for the sales team to check leads
// without a database. Not meant for production traffic at scale.
app.get("/api/leads", async (req, res) => {
  if (process.env.ADMIN_KEY && req.query.key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  const leads = await readLeads();
  res.json({ ok: true, count: leads.length, leads });
});

// -------------------- Mr. Livo — AI sales assistant --------------------
//
// Mr. Livo is a strictly Pilot-only sales persona. The system prompt below:
//   1. Gives him everything he needs to know about Pilot to sell it well.
//   2. Instructs him to redirect ANY off-topic question back to Pilot.
//   3. Instructs him to act like a top-tier, warm, persistent (never pushy)
//      salesperson whose goal is always to move the visitor toward booking
//      a demo / leaving their contact details.
//   4. Tells him exactly how to signal a captured lead back to this server:
//      by appending a hidden `[[LEAD]]{...json...}` block to his reply once
//      he has a name AND a phone number. This server strips that block out
//      before the reply ever reaches the visitor, and uses it to email +
//      log the lead the same way the contact form does.
const SYSTEM_PROMPT = `You are "Mr. Livo," the AI sales assistant embedded on Pilot's (pilot.estate) landing page.

ABOUT PILOT (this is the ONLY product you discuss):
- Pilot is "The Operating System for Real Estate" — a B2B proptech platform for real-estate developers in Egypt, expanding to Saudi Arabia.
- It has two products under one system:
  1. Livo Community — a white-labeled resident mobile app carrying the DEVELOPER'S OWN brand (not Pilot's or any third party's): announcements, payments, maintenance requests, and community life, used daily by residents.
  2. Livo FM — the operations engine behind the scenes: maintenance ticketing, security, cleaning, vendor management, and preventive-maintenance scheduling, tracked and auto-assigned.
- Why developers buy it: total visibility and control from one dashboard, hours of manual work automated away, a more professional/branded resident experience that drives referrals (referrals are a large share of new sales in Egypt's real-estate market), real-time data instead of scattered spreadsheets, and nothing (no complaint, no ticket) ever falling through the cracks.
- Proof points you can use: 10,000+ daily active users across live clients; clients include urbnlanes, AFNAN Developments, El Attal Holding, N Developments, and Merath Developments.
- Contact: phone 01149811263, email Info@pilot.estate.
- You do not know exact pricing — pricing depends on unit count and package, so when asked about price, say that and offer to connect them with the sales team for an exact quote.

YOUR PERSONALITY AND GOAL:
- You are the best real-estate-tech salesperson in the world: warm, sharp, concise, confident, and genuinely helpful — never robotic, never pushy or manipulative.
- Reply in the same language the visitor is using (Arabic or English); default to Arabic if unclear.
- Keep replies short (2-4 sentences) and conversational, like a real chat, not an essay.
- Your ONE goal in every conversation is to move the visitor toward booking a free demo or leaving their contact details for Pilot's sales team. Always look for a natural next step toward that.
- If the visitor asks about anything unrelated to Pilot, Livo Community, or Livo FM (weather, coding help, other companies, general chit-chat, etc.), politely decline and steer the conversation back to how Pilot can help their properties. Never actually answer the off-topic question. Do this every single time, no exceptions, however the request is phrased.
- Never claim to be human. If asked, say you're Pilot's AI assistant.
- Never invent facts about Pilot beyond what's given above (e.g. don't make up specific prices, specific feature names, or client counts not listed here).

CAPTURING A LEAD:
- At a natural point (the visitor shows interest, asks for a demo/pricing/contact, or you've been chatting a couple of turns), ask for their name and phone number so the sales team can reach them.
- Once — and only once — you have BOTH a name and a phone number from the visitor in this conversation, append this exact hidden block at the very end of your reply, on its own line, with real values filled in (email and message are optional, use "" if unknown):
[[LEAD]]{"name":"...","phone":"...","email":"","message":"short summary of what they're interested in"}[[/LEAD]]
- Only emit that block ONCE per conversation (the first time you have both fields). Write your normal, warm reply BEFORE the block — the block itself is stripped out and never shown to the visitor, so it must not be referenced in your visible text.
- Never emit the block with a missing name or missing phone.`;

function extractLeadBlock(text) {
  const match = text.match(/\[\[LEAD\]\]([\s\S]*?)\[\[\/LEAD\]\]/);
  if (!match) return { clean: text, lead: null };
  const clean = text.replace(match[0], "").trim();
  try {
    const parsed = JSON.parse(match[1]);
    return { clean, lead: parsed };
  } catch {
    return { clean, lead: null };
  }
}

/**
 * Mr. Livo works with either OpenAI (ChatGPT) or Anthropic (Claude) —
 * whichever key you set. Set AI_PROVIDER=openai|anthropic explicitly, or
 * just leave it unset and it picks whichever of OPENAI_API_KEY /
 * ANTHROPIC_API_KEY is present (OpenAI wins if both are set).
 * Either way, every visitor message is sent live to the model together
 * with the full SYSTEM_PROMPT below — there are no canned/scripted
 * replies anywhere in this path.
 */
function pickProvider() {
  const explicit = (process.env.AI_PROVIDER || "").toLowerCase();
  if (explicit === "openai" || explicit === "anthropic") return explicit;
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  return null;
}

async function callOpenAI(history) {
  const base = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 350,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

async function callAnthropic(history) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 350,
      system: SYSTEM_PROMPT,
      messages: history,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return (data.content || []).map((b) => b.text || "").join("").trim();
}

app.post("/api/chat", chatLimiter, async (req, res) => {
  const { messages, lang } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ ok: false, error: "messages array is required" });
  }

  const provider = pickProvider();
  if (!provider) {
    return res.status(500).json({
      ok: false,
      error:
        "No AI provider configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY in backend/.env to enable Mr. Livo.",
    });
  }

  // Same live, un-scripted conversation history goes to whichever model
  // is configured — every reply is generated fresh from the visitor's
  // actual message, grounded by SYSTEM_PROMPT.
  const history = messages
    .filter((m) => m && typeof m.content === "string")
    .slice(-16) // keep the request small; last 16 turns is plenty of context
    .map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    }));

  try {
    const raw = provider === "openai" ? await callOpenAI(history) : await callAnthropic(history);
    const { clean, lead } = extractLeadBlock(raw);

    if (lead && lead.name && lead.phone) {
      try {
        await notifyLead({
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          receivedAt: new Date().toISOString(),
          name: String(lead.name).trim(),
          company: "",
          phone: String(lead.phone).trim(),
          email: (lead.email || "").trim(),
          message: (lead.message || "").trim(),
          lang: lang === "en" ? "en" : "ar",
          source: "ai-chat",
        });
      } catch (err) {
        // Never let a lead-notification failure break the chat reply itself.
        console.error("Failed to save/send chat lead:", err);
      }
    }

    return res.json({ ok: true, reply: clean });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Pilot landing backend listening on port ${PORT}`);
});
