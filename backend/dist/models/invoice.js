import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";
const { ObjectId } = mongoose.Types;
const Invoice = new Schema({
    totalSum: Number,
    items: {
        type: [
            {
                // optional
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
    completedAt: {
        type: Date,
    },
    name: {
        type: String,
        default: "",
    },
    type: {
        type: [String],
        enums: ["purchasing", "saling"],
    },
    // optinal for saling
    customerDetails: {
        type: {
            name: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now(),
            },
            amountPayed: Number,
        },
    },
    ...defaultSchema("Invoice"),
});
export default model("Invoice", Invoice);
