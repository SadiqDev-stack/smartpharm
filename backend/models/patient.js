import mongoose, { Schema, model, Document, Types } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const { ObjectId } = mongoose.Types;

// 🔹 Schema
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
    enum: ["male", "female"],
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
        patientData: Object,
      },
    ],
    default: [],
  },
  loanId: {
    type: ObjectId,
    ref: "Loan",
  },
  ...defaultSchema("Patient"),
});

export default model("smartpharm_patient", Patient);