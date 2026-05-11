/*

│ • products: { total, expired, invoiced, lowStock }                          │
│ • loans: { total, sum, resolved, unresolved }                               │
│ • patient: { resolved, growth: {teen, adult, infant}, gender stats }        │
│ • invoice: { total, resolved, items, revenue }                              

*/

import mongoose, { Schema, model } from "mongoose";
import mogoose from "mongoose";
import { generateUniqueId } from "../utilities/general.js";
import { defaultSchema } from "../utilities/models.js";
const { ObjectId } = mongoose.Types;

const Stat = new Schema<IStatDocument>({
  totalUsers: Number,
  totalLoans: Number,
  totalPatients: Number,
  totalInvoice: Number,
  totalProduct: Number,
  totalNotifications: Number,
  smallShops: Number,
  mediumShops: Number,
  enterpriseShops: Number,
  id: generateUniqueId("Stat"),
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

Stat.index({ id: 1, createdAt: -1 });

export default model("smartpharm_stat", Stat);
