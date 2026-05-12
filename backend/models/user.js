import mongoose, { Schema, model } from "mongoose";
import { generateUniqueId } from "../utilities/general.js";
import { defaultSchema } from "../utilities/models.js";

const {
  BASIC_USAGE_LIMIT = 30, // THIS IS DAY LIMIT FOR ONLINE USERS TO PAY DEFAULT IS MONTH
  BASIC_EMAIL_LIMIT = 200,
  MAX_LOGIN_FAIL_ATTEMPT = 5,
} = process.env;

const defaultPackages = [
  {
    name: BASIC_USAGE_LIMIT,
    description:
      "this is a free package for users in our app to test it and explore the features",
    price: 0,
  },
];

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 200,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 200,
      lowercase: true,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    activationMessage: {
      type: String,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      maxLength: 200,
    },
    accountMode: {
      type: String,
      enum: ["live", "offline"],
    },
    password: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "super"],
      default: "user",
    },
    package: {
      type: String,
      default: defaultPackages[0].name,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },

    loginFailAttempt: {
      type: Number,
      max: +MAX_LOGIN_FAIL_ATTEMPT,
      default: 0,
    },
    lastFailedLogin: {
      type: Date,
      default: Date.now(),
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      immutable: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now(),
    },

    passCode: {
      type: String,
      maxLength: 4,
      default: "0000",
    },

    address: {
      type: String,
      required: true,
    },

    storage: {
      type: [
        {
          name: String,
          description: String,
        },
      ],
      required: true,
      default: [],
    },

    stats: {
      type: {
        totalLoans: Number,
        totalPatients: Number,
        totalInvoice: Number,
        totalProduct: Number,
        totalNotifications: Number,
      },

      default: {
        totalLoans: 0,
        totalPatients: 0,
        totalInvoice: 0,
        totalProduct: 0,
        totalNotifications: 0,
      },
    },

    shopDescription: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["small", "medium", "enterprise"],
        required: true,
      },
    },
  },

  {
    timestamps: true,
  },
);

// │ • pharmName: string                                                         │
// │ • pharmDescription: string                                                  │
// │ • pharmCertificate: string                                                  │
// │ • pharmYears: number                                                        │
// │ • pharmType: enum(small, medium, enterprise)

UserSchema.index({ createdAt: -1 });
UserSchema.index({ name: 1 });

export default model("smartpharm_user", UserSchema);
