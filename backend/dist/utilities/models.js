import mongoose from "mongoose";
import { generateUniqueId } from "./helper.js";
const { ObjectId } = mongoose.Types;
const defaultSchema = (modelName = "") => {
    return {
        mediaSource: {
            type: String,
            default: "N/A",
        },
        pinned: {
            type: Boolean,
            default: true,
        },
        id: {
            type: ObjectId,
            default: generateUniqueId(modelName),
        },
        userId: {
            type: ObjectId,
            ref: "User",
        },
        createdAt: { immutable: true, type: Date, default: Date.now, index: true },
        updatedAt: { type: Date, default: Date.now },
        createdBy: { type: ObjectId, ref: "User" },
        isImported: { type: Boolean, default: false },
        syncInfo: {
            dataUploaded: Boolean,
            mediaUploaded: Boolean,
            default: {
                dataUploaded: true,
                mediaUploaded: false,
            },
        },
    };
};
export { defaultSchema };
