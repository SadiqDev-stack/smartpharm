import mongoose, { Schema, model, Document } from "mongoose"
import { generateUniqueId } from "../utilities/general.js"
import { defaultSchema } from "../utilities/models.js"

const { ObjectId } = mongoose.Types

// 🔹 Schema
const LoanSchema = new Schema({
  from: {
    type: ObjectId,
    ref: "Patient",
    index: true //  INDEX
  },
  name: {
    type: String,
    unique: true,
    index: true //  INDEX
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  phone: {
    type: String,
    maxLength: 12,
    required: true,
    index: true //  INDEX (search fast)
  },
  location: {
    type: String,
    default: "N/A"
  },
  loanBreakDown: {
    type: [
      {
        amount: Number,
        priceRemaining: { type: Number, default: 0 },
        payed: { type: Boolean, default: false },
        productName: String,
        quantitiy: String,
        description: String,
        date: { type: Date, default: Date.now },
        id: { type: String, default: () => generateUniqueId("loanForDay") }
      }
    ],
    default: []
  },
  amountBreakDown: {
    totalLoanCost: Number,
    totalAmountPayed: Number
  },
  paymentBreakDown: [
    {
      date: { type: Date, default: Date.now },
      amountPaid: Number,
      channel: String,
      loansCovered: [String]
    }
  ],

  ...defaultSchema("Loan")
})

//  Compound index (VERY IMPORTANT)
LoanSchema.index({ phone: 1, name: 1 })

export default model("smartpharm_loan", LoanSchema)