import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
    },

    roomName: {
      type: String,
      default: "Untitled Room",
    },

    hostId: {
      type: String,
      required: true,
    },

    participants: [
      {
        participantId: {
          type: String,
          required: true,
          trim: true,
        },
        participantName: {
          type: String,
          required: true,
          trim: true,
          maxlength: 50,
        },
        participantHandle: {
          type: String,
          trim: true,
          maxlength: 30,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        lastSeenAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);