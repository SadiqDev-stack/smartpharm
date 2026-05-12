import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const StatSchema = new Schema(
  {
    products: {
      total: Number,
      expired: Number,
      expiringWithin30Days: Number,
      lowStock: Number,
      invoicedThisPeriod: Number,
    },
    loans: {
      total: Number,
      active: Number,
      fullyPaid: Number,
      overdue: Number,
      totalAmount: Number,
      totalPaid: Number,
      totalOutstanding: Number,
    },
    patients: {
      total: Number,
      resolved: Number,
      active: Number,
      byAge: {
        infant: Number,
        child: Number,
        teenager: Number,
        adult: Number,
        senior: Number,
      },
      byGender: { male: Number, female: Number, other: Number },
    },
    invoices: {
      total: Number,
      completed: Number,
      totalRevenue: Number,
      itemsSold: Number,
      averageInvoiceValue: Number,
    },
    period: { type: String, enum: ["daily", "weekly", "monthly"], default: "daily" },
    lastUpdated: { type: Date, default: Date.now },
    ...defaultSchema("Stat"),
  },
  { timestamps: true }
);

StatSchema.index({ userId: 1, period: 1 });
StatSchema.index({ createdAt: -1 });

export default model("smartpharm_stat", StatSchema);
