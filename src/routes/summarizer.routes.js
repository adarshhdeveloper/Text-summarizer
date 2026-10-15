import { Router } from "express"
import { summarizeController } from "../controller/summarizer.controller.js";

const router = Router();

router.post("/api/summarize", summarizeController);

export default router;