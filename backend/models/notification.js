import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const { ObjectId } = mongoose.Types;

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["info", "warning", "error", "success"], default: "info" },
    category: { type: String, enum: ["expiry", "payment_due", "low_stock", "patient_update", "system"] },
    sourceId: { type: ObjectId, ref: "smartpharm_product" },
    isRead: { type: Boolean, default: false },
    expiresAt: Date,
    ...defaultSchema("Notification"),
  },
  { timestamps: true }
);

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default model("smartpharm_notification", NotificationSchema);
