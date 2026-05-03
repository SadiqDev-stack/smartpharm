import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";
const { ObjectId } = mongoose.Types;
// • title: string                                                             │
// │ • description: string                                                       │
// │ • flag: enum(info, warning, error, success)                                 │
// │ • from: string                                                              │
// │ • seen: boolean                                                             │
// │ • id: string                                                                │
// │ • userId: reference
const Notification = new Schema({
    title: {
        type: String,
        required: true,
    },
    flag: {
        type: String,
        enums: ["info", "warning", "error", "success", "urgent"],
    },
    from: {
        type: String,
        enums: ["assistant", "system", "admin"],
    },
    seen: {
        type: Boolean,
        default: false,
    },
    ...defaultSchema("Notification"),
});
export default model("Notification", Notification);
