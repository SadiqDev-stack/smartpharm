import mongoose, { Schema, model } from "mongoose";
import { generateUniqueId } from "../utilities/helper.js";
import { defaultSchema } from "../utilities/models.js";

const {
  BASIC_API_LIMIT = 1000,
  BASIC_EMAIL_LIMIT = 200,
  MAX_LOGIN_FAIL_ATTEMPT = 5,
} = process.env;

const defaultPackages = [
  {
    name: BASIC_API_LIMIT,
    description:
      "this is a free package for users in our app to test it and explore the features",
    price: 0,
  },
];

export interface IUserDocument extends mongoose.Document {
  name: string;
  email: string;
  active: boolean;
  activationMessage: string;
  phone: string;
  accountMode: "live" | "offline";
  password: string;
  gender: "male" | "female";
  state: string;
  role: "admin" | "user" | "super";
  package: string;
  emailVerified: boolean;
  lastLogin: Date;
  loginFailAttempt: number;
  lastFailedLogin: Date;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  wallets: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  }[];
  passCode: string;
  address: string;
  lastFunding: Date;
  totalFunding: number;
  storage: {
    phoneNumbers: string[];
  };
  stats: {
    totalLoans: number;
    totalPatients: number;
    totalInvoice: number;

    totalProduct: number;
    totalNotifications: number;
  };
  shopDescription: {
    name: string;
    description: string;
    type: "small" | "medium" | "enterprise";
  };
}

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
    balance: {
      type: Number,
      default: 0,
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

    wallets: {
      type: [
        {
          accountNumber: String,
          accountName: String,
          bankName: String,
        },
      ],
      default: [],
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

    lastFunding: {
      type: Date,
      default: Date.now(),
    },

    totalFunding: {
      type: Number,
      default: 0,
    },

    storage: {
      phoneNumbers: [String],
      default: {
        phoneNumbers: [],
      },
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
      name: String,
      description: String,
      type: {
        enum: ["small", "medium", "enterprise"],
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

UserSchema.index({ apiKey: 1 });
UserSchema.index({ createdAt: 1 });

export default model("SmartPharm_User", UserSchema);
