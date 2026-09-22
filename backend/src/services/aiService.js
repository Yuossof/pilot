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
  if (!res.ok) throw new Error(`AI ${res.status}: ${await res.text()}`);
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
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.content || []).map((block) => block.text || "").join("").trim();
}

export function extractLeadBlock(text) {
  const match = text.match(/\[\[LEAD\]\]([\s\S]*?)\[\[\/LEAD\]\]/);
  if (!match) return { clean: text, lead: null };
  const clean = text.replace(match[0], "").trim();
  try {
    return { clean, lead: JSON.parse(match[1]) };
  } catch {
    return { clean, lead: null };
  }
}

export async function generateReply(messages) {
  const provider = pickProvider();
  if (!provider) {
    const error = new Error(
      "No AI provider configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY in backend/.env to enable Mr. Livo."
    );
    error.code = "AI_PROVIDER_NOT_CONFIGURED";
    throw error;
  }

  const history = messages
    .filter((message) => message && typeof message.content === "string")
    .slice(-16)
    .map((message) => ({
      role: message.role === "user" ? "user" : "assistant",
      content: message.content,
    }));

  const raw = provider === "openai" ? await callOpenAI(history) : await callAnthropic(history);
  return extractLeadBlock(raw);
}
