import mongoose, { Schema } from "mongoose";

const VerificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "User ID is Required",
    },
    token: {
      type: String,
      required: "Token is Required",
    },
    type: {
      type: String,
      required: "Type is Required",
      enum: ["VERIFY_EMAIL", "RESET_PASSWORD"],
    },
    attempts: {
      type: Number,
      default: 0,
      min: [0, "Attempts cannot be less than 0"],
      max: [5, "Attempts cannot be more than 5"],
    },
    resendCount: {
      type: Number,
      default: 0,
      min: [0, "Resend count cannot be less than 0"],
      max: [5, "Resend count cannot be more than 5"],
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: "Expiration Date is Required",
      index: {
        expires: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

VerificationSchema.index(
  {
    userId: 1,
    type: 1,
  },
  {
    unique: true,
  },
);

const Verification =
  mongoose.models.Verification ||
  mongoose.model("Verification", VerificationSchema);

export default Verification;
