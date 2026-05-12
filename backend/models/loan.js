import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const { ObjectId } = mongoose.Types;

const LoanSchema = new Schema(
  {
    borrowerName: { type: String, required: true, trim: true, index: true },
    borrowerPhone: { type: String, required: true, index: true },
    borrowerGender: { type: String, enum: ["male", "female"] },
    borrowerLocation: String,
    loanItems: [
      {
        productId: { type: ObjectId, ref: "smartpharm_product" },
        productName: String,
        quantity: Number,
        unitPrice: Number,
        totalPrice: Number,
        description: String,
        date: { type: Date, default: Date.now },
      },
    ],
    amountSummary: {
      totalLoanAmount: Number,
      totalPaid: { type: Number, default: 0 },
      balanceRemaining: Number,
    },
    paymentHistory: [
      {
        date: { type: Date, default: Date.now },
        amountPaid: Number,
        paymentMethod: { type: String, enum: ["cash", "bank_transfer", "mobile_money", "cheque"] },
        paidBy: String,
        itemsCovered: [String],
        notes: String,
      },
    ],
    loanStatus: { type: String, enum: ["active", "partial_paid", "fully_paid", "overdue"], default: "active" },
    isOverdue: { type: Boolean, default: false },
    notes: String,
    ...defaultSchema("Loan"),
  },
  { timestamps: true }
);

LoanSchema.index({ borrowerPhone: 1, userId: 1 });
LoanSchema.index({ loanStatus: 1 });

export default model("smartpharm_loan", LoanSchema);
