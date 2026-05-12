import express from "express";
import { getLoans, getLoan, createLoan, addPayment, deleteLoan, getOverdueLoans } from "../controllers/loanController.js";

const router = express.Router();

router.get("/", getLoans);
router.get("/overdue", getOverdueLoans);
router.get("/:id", getLoan);
router.post("/", createLoan);
router.post("/:id/payment", addPayment);
router.delete("/:id", deleteLoan);

export default router;
