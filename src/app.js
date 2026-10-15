import express from "express";
import healthRoutes from "./routes/health.routes.js";
import summarizeRoutes from "./routes/summarizer.routes.js";
import historyRoutes from "./routes/history.routes.js";

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use(healthRoutes);
app.use(summarizeRoutes);
app.use(historyRoutes);

export default app;