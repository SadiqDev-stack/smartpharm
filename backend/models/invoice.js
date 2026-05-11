import mongoose, { Schema, model, Document, Types } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const { ObjectId } = mongoose.Types;

// 🔹 Schema
const Invoice = new Schema({
  totalSum: Number,
  items: {
    type: [
      {
        productId: {
          type: ObjectId,
          ref: "Product",
        },
        qunatitiy: String,
        productName: String,
        price: Number,
      },
    ],
    default: [],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: Date,
  name: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    enum: ["purchasing", "saling"],
    required: true,
  },
  customerDetails: {
    name: String,
    date: { type: Date, default: Date.now },
    amountPayed: Number,
  },

  ...defaultSchema("Invoice"),
});

export default model("smartpharm_invoice", Invoice);
