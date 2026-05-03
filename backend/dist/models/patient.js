import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";
const { ObjectId } = mongoose.Types;
const Patient = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        maxLength: 12,
    },
    gender: {
        type: String,
        enums: ["male", "female"],
    },
    description: {
        type: String,
        required: true,
    },
    location: String,
    resolved: {
        type: Boolean,
        default: false,
    },
    returnings: {
        type: Number,
        default: 0,
    },
    dosageBreakdown: {
        type: [
            {
                label: String,
                date: Date,
                completed: Boolean,
            },
        ],
        default: [],
    },
    resolutionBreakdown: {
        type: [
            {
                label: String,
                date: Date,
                patientData: Object, // instance of his data during that time
            },
        ],
        default: [],
    },
    loanId: {
        type: ObjectId,
        ref: "Loan"
    },
    ...defaultSchema("Patient")
});
export default model("Patient", Patient);
