// routers/contact.js
import { Router } from "express";
import { contactController } from "../controllers/contactController.js";
import authorize from "../middlewares/authorization.js";

const router = Router();

// Public route - submit support ticket
router.post("/support", contactController.submitSupport);

// All routes below require authentication
router.use(authorize);

// Contact management routes
router.get("/history", contactController.getHistory);
router.get("/contact/:id", contactController.getContactById);
router.put("/see", contactController.markAsSeen);
router.put("/see-all", contactController.markAllAsSeen);
router.delete("/old", contactController.deleteOldContacts);

export default router;