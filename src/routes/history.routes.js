import { Router } from "express";
import { getHistory } from "../controller/history.controller.js";

const router = Router();

router.get("/api/history", getHistory);

export default router;