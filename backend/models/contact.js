import { Schema, model, ObjectId } from "mongoose";


// // {
//   name: 'Sadiq Abubakar',
//   email: 'sadiqmuh1321@gmail.com',
//   phone: '+2348145742404',
//   subject: 'djdkd',
//   message: 'dusidfu dfiudyn djd'
// }

const Contact = new Schema({
  phone: {
    type: String,
    maxLength: 15,
    required: true,
  },
  email: {
    type: String,
    maxLength: 30,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  subject: {
    type: String,
    required: true,
    maxLength: 200,
  },
  for: {
    type: String,
    enum: ["single", "all"],
    default: "single",
  },
  message: {
    type: String,
    required: true,
    minLength: 20,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  data: {
    type: Object,
  },
  from: {
    type: String,
    enum: ["system", "people", "api", "provider"],
    default: "people",
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

export default model("smartpharm_contact", Contact);
