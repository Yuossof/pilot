import { Router } from "express";
import { chatLimiter } from "../middleware/rateLimiters.js";
import { generateReply } from "../services/aiService.js";
import { notifyLead } from "../services/leadService.js";
import { createLeadId } from "../utils/ids.js";

const router = Router();

router.post("/chat", chatLimiter, async (req, res) => {
  const { messages, lang } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ ok: false, error: "messages array is required" });
  }

  try {
    const { clean, lead } = await generateReply(messages);

    if (lead && lead.name && lead.phone) {
      try {
        await notifyLead({
          id: createLeadId(),
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
        console.error("Failed to save/send chat lead:", err);
      }
    }

    return res.json({ ok: true, reply: clean });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

export default router;
