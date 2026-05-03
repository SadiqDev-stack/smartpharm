import mongoose, { Schema, model } from "mongoose";
import { generateUniqueId } from "../utilities/helper.js";
import { defaultSchema } from "../utilities/models.js";
const { ObjectId } = mongoose.Types;
// we have max loan storage length
const maxLoanHistoryLength = 200;
const Loan = new Schema({
    from: {
        type: ObjectId,
        ref: "Patient"
    },
    name: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enums: ["male", "female"]
    },
    phone: {
        type: String,
        maxLength: 12,
        required: true
    },
    location: {
        type: String,
        default: 'N/A'
    },
    loanBreakDown: {
        type: [{
                amount: Number,
                priceRemaining: {
                    type: Number,
                    default: 0
                },
                payed: {
                    type: Boolean,
                    default: false
                },
                productName: String,
                quantitiy: String,
                description: String,
                date: {
                    type: Date,
                    default: Date.now()
                },
                id: generateUniqueId("loanForDay")
            }],
        maxLength: maxLoanHistoryLength,
        default: []
    },
    amountBreakDown: {
        totalLoanCost: Number,
        totalAmountPayed: Number
    },
    paymentBreakDown: [{
            date: {
                type: Date,
                default: Date.now()
            },
            amountPaid: Number,
            channel: {
                type: String // bank transfer , cash and who bring 
            },
            loansCovered: [String] // id of loan breakdown payed including partial
        }],
    ...defaultSchema("Loan")
});
export default model("Loan", Loan);
