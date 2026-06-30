import z from "zod/v4";
import { objectIdSchema } from "../../shared/schemas/id.schema.js";

const roomIdSchema = z.strictObject({
  id: objectIdSchema,
});

const createRoomSchema = z.strictObject({
  roomName: z.string().trim().min(1).max(100).optional(),
});

const joinRoomSchema = z.strictObject({
  roomCode: z.string().trim().min(1).max(20),
});

const renameRoomSchema = z.strictObject({
  roomName: z.string().trim().min(1).max(100),
});

const kickParticipantSchema = z.strictObject({
  id: objectIdSchema,
  participantId: objectIdSchema,
});

export {
  createRoomSchema,
  joinRoomSchema,
  kickParticipantSchema,
  renameRoomSchema,
  roomIdSchema,
};
