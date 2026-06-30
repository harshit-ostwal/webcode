import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "User ID is required",
    },
    ipAddress: {
      type: String,
      required: "IP address is required",
    },
    userAgent: {
      type: String,
      required: "User agent is required",
    },
    refreshToken: {
      type: String,
      required: "Refresh token is required",
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: "Refresh token expiration date is required",
      default: () => {
        const now = new Date();
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      },
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Session =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);

export default Session;
