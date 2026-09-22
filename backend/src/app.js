import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/env.js";
import healthRoutes from "./routes/healthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

app.use("/api", healthRoutes);
app.use("/api", contactRoutes);
app.use("/api", leadRoutes);
app.use("/api", chatRoutes);

export default app;
