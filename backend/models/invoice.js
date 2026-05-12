import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const { ObjectId } = mongoose.Types;

const InvoiceSchema = new Schema(
  {
    invoiceNumber: { type: String, unique: true, required: true, index: true },
    type: { type: String, enum: ["purchasing", "selling"], required: true },
    items: [
      {
        productId: { type: ObjectId, ref: "smartpharm_product" },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: Number,
      },
    ],
    totalAmount: Number,
    customerDetails: {
      name: String,
      contactPhone: String,
      paymentAmount: Number,
      remainingBalance: Number,
      paymentDate: Date,
    },
    isCompleted: { type: Boolean, default: false },
    completedDate: Date,
    invoiceDate: { type: Date, default: Date.now },
    notes: String,
    ...defaultSchema("Invoice"),
  },
  { timestamps: true }
);

InvoiceSchema.index({ invoiceNumber: 1, userId: 1 });
InvoiceSchema.index({ type: 1, isCompleted: 1 });

export default model("smartpharm_invoice", InvoiceSchema);
