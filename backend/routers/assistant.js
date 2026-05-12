// routers/assistant.js
import { Router } from "express";
import { assistantController } from "../controllers/assistantController.js";

const router = Router();

// AI assistant routes
router.post("/", assistantController.getAssistantResponse);
router.post("/chat", assistantController.getUserChat);

export default router;