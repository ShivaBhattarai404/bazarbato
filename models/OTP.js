import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema.Types;

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["email", "phone"],
    default: "email",
  },
  lastGeneratedOtpIn: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    // Time when OTP is created
    type: Date,
    default: Date.now,
    expires: "5m", // OTP will expire in 5 minutes
  },
});

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
