import express from "express";
import { getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice, markCompleted } from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", createInvoice);
router.patch("/:id", updateInvoice);
router.patch("/:id/complete", markCompleted);
router.delete("/:id", deleteInvoice);

export default router;
