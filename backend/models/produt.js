import mongoose, { model, Schema, Document, Types } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const { ObjectId } = mongoose.Types;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    dosage: {
      pregnantAllowed: Boolean,
      sensitive: { type: Boolean, default: false },
      breakdown: [
        {
          label: String, // adult infant child pregnant
          description: String, // 2 times a day
          age: String, // 12 above
        },
      ],
    },
    type: {
      type: String,
      enum: [
        "injection",
        "syrup",
        "drop",
        "cream",
        "inhaler",
        "tin",
        "drip",
        "item",
      ],
      index: true,
    },
    relatedProduct: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    price: [
      {
        label: String, // per bottle etc
        value: Number,
      },
    ],
    invoicingCount: { type: Number, default: 0 },
    priceUpdateBreakdown: [
      {
        date: Date,
        price: Number,
      },
    ],
    expiryDate: Date,
    expiryCount: { type: Number, default: 0 },
    ...defaultSchema("Product"),
  },
  { timestamps: true },
);

// Indexes for queries
ProductSchema.index({ name: 1, type: 1 });
ProductSchema.index({ expiryDate: 1 });
ProductSchema.index({ createdAt: -1 });

export default model("smartpharm_product", ProductSchema);
