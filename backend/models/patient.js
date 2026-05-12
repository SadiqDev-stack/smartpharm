import mongoose, { Schema, model } from "mongoose";
import { defaultSchema } from "../utilities/models.js";

const PatientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: String,
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    age: { type: String, enum: ["infant", "child", "teenager", "adult", "senior"] },
    condition: String,
    location: String,
    healthData: {
      weight: Number,
      bloodPressure: String,
      isPregnant: Boolean,
      sugarLevel: Number,
      isInfectious: Boolean,
      diabetesLevel: String,
    },
    returningCount: { type: Number, default: 0 },
    dosageSchedule: [
      {
        label: String,
        prescribedDate: Date,
        completed: { type: Boolean, default: false },
        completedDate: Date,
      },
    ],
    resolutionHistory: [
      {
        date: Date,
        status: String,
        snapshot: Schema.Types.Mixed,
      },
    ],
    totalLoans: { type: Number, default: 0 },
    totalLoanAmount: { type: Number, default: 0 },
    isResolved: { type: Boolean, default: false },
    notes: String,
    ...defaultSchema("Patient"),
  },
  { timestamps: true }
);

PatientSchema.index({ name: 1, userId: 1 });
PatientSchema.index({ isResolved: 1 });

export default model("smartpharm_patient", PatientSchema);
    default: [],
  },
  loanId: {
    type: ObjectId,
    ref: "Loan",
  },
  ...defaultSchema("Patient"),
});

export default model("smartpharm_patient", Patient);