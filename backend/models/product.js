import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["injection", "syrup", "drop", "cream", "inhaler", "tablet", "capsule", "ointment", "powder", "solution", "spray", "item"],
      index: true,
    },
    dosage: {
      pregnantAllowed: { type: Boolean, default: false },
      sensitive: { type: Boolean, default: false },
      breakdown: [
        {
          label: String,
          description: String,
          ageRange: String,
        },
      ],
    },
    pricing: [
      {
        unit: String,
        amount: Number,
        quantity: Number,
      },
    ],
    stock: { type: Number, default: 0 },
    expiryDate: Date,
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: "smartpharm_product" }],
    priceHistory: [
      {
        date: Date,
        price: Number,
        unit: String,
      },
    ],
    invoiceCount: { type: Number, default: 0 },
    ...defaultSchema("Product"),
  },
  { timestamps: true }
);

ProductSchema.index({ name: 1, type: 1 });
ProductSchema.index({ expiryDate: 1 });

export default model("smartpharm_product", ProductSchema);
