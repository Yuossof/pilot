import { Router } from "express";
import { contactLimiter } from "../middleware/rateLimiters.js";
import { notifyLead } from "../services/leadService.js";
import { validateLead } from "../validation/leadValidation.js";
import { createLeadId } from "../utils/ids.js";

const router = Router();

router.post("/contact", contactLimiter, async (req, res) => {
  const errors = validateLead(req.body);
  if (errors.length) return res.status(400).json({ ok: false, errors });

  const lead = {
    id: createLeadId(),
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

export default router;
