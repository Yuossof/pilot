import { Router } from "express";
import { ADMIN_KEY } from "../config/env.js";
import { readLeads } from "../services/leadService.js";

const router = Router();

router.get("/leads", async (req, res) => {
  if (ADMIN_KEY && req.query.key !== ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  const leads = await readLeads();
  res.json({ ok: true, count: leads.length, leads });
});

export default router;
