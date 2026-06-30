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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
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