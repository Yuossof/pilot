import fs from "fs/promises";
import nodemailer from "nodemailer";
import { LEADS_FILE } from "../config/paths.js";

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

export async function notifyLead(lead) {
  await appendLead(lead);

  if (!process.env.NOTIFY_EMAIL_TO) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.NOTIFY_EMAIL_TO,
    bcc: process.env.NOTIFY_EMAIL_CC || undefined,
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

export { readLeads };
