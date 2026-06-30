import ApiError from "../../core/http/api.error.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import generateObjectId from "../../shared/utils/objectId.utils.js";
import { RoomMessages } from "./room.messages.js";
import { RoomRepository } from "./room.repository.js";

class RoomService {
  #roomRepo;
  constructor() {
    this.#roomRepo = new RoomRepository();
  }

  async createRoom(userId, data) {
    const roomCode = this.#generateRoomCode();
    const { participantName, participantHandle, participantId, ...roomData } =
      data;

    const payload = {
      roomCode,
      hostId: userId,
      ...roomData,
      participants: [
        this.#buildParticipant({
          participantId: participantId?.trim() || this.#generateParticipantId(),
          participantName: participantName?.trim() || "Host",
          participantHandle: participantHandle?.trim() || null,
        }),
      ],
    };

    const room = await this.#roomRepo.create(payload);

    if (!room) {
      throw ApiError.badRequest(RoomMessages.Errors.CREATE_ROOM_FAILED);
    }

    return room;
  }

  async joinRoom(userId, data) {
    const room = await this.#roomRepo.findByCode(data.roomCode);

    if (!room) {
      throw ApiError.notFound(RoomMessages.Errors.ROOM_NOT_FOUND);
    }

    if (room.hostId === userId) {
      return room;
    }

    const participants = room.participants ?? [];
    const participantId =
      data.participantId?.trim() || this.#generateParticipantId();
    const participantName = data.participantName?.trim() || "Guest";
    const participantHandle = data.participantHandle?.trim() || null;
    const existingParticipant = participants.find(
      (participant) => String(participant.participantId) === String(participantId),
    );

    if (existingParticipant) {
      existingParticipant.participantName = participantName;
      existingParticipant.participantHandle = participantHandle;
      existingParticipant.isActive = true;
      existingParticipant.lastSeenAt = new Date();

      const updatedRoom = await this.#roomRepo.updateById(room._id, {
        participants,
      });

      if (!updatedRoom) {
        throw ApiError.badRequest(RoomMessages.Errors.JOIN_ROOM_FAILED);
      }

      return updatedRoom;
    }

    participants.push(
      this.#buildParticipant({
        participantId,
        participantName,
        participantHandle,
      }),
    );

    const updatedRoom = await this.#roomRepo.updateById(room._id, {
      participants,
    });

    if (!updatedRoom) {
      throw ApiError.badRequest(RoomMessages.Errors.JOIN_ROOM_FAILED);
    }

    return updatedRoom;
  }

  async getRoomById(userId, id) {
    const room = await this.#roomRepo.findById(userId, id);

    if (!room) {
      throw ApiError.notFound(RoomMessages.Errors.ROOM_NOT_FOUND);
    }

    return room;
  }

  async renameRoom(userId, id, data) {
    const existingRoom = await this.getRoomById(userId, id);
    const changedFields = getChangedFields(existingRoom, data);

    if (Object.keys(changedFields).length === 0) {
      return existingRoom;
    }

    const room = await this.#roomRepo.update(userId, id, changedFields);

    if (!room) {
      throw ApiError.badRequest(RoomMessages.Errors.RENAME_ROOM_FAILED);
    }

    return room;
  }

  async closeRoom(userId, id) {
    const room = await this.#roomRepo.update(userId, id, { isActive: false });

    if (!room) {
      throw ApiError.badRequest(RoomMessages.Errors.CLOSE_ROOM_FAILED);
    }

    return room;
  }

  async kickParticipant(userId, id, participantId) {
    const room = await this.getRoomById(userId, id);

    if (room.hostId !== userId) {
      throw ApiError.forbidden(RoomMessages.Errors.UNAUTHORIZED_ROOM_ACTION);
    }

    const participants = room.participants ?? [];
    const filteredParticipants = participants.filter(
      (participant) => String(participant.participantId) !== String(participantId),
    );

    if (filteredParticipants.length === participants.length) {
      throw ApiError.notFound(RoomMessages.Errors.PARTICIPANT_NOT_FOUND);
    }

    const updatedRoom = await this.#roomRepo.updateById(room._id, {
      participants: filteredParticipants,
    });

    if (!updatedRoom) {
      throw ApiError.badRequest(RoomMessages.Errors.KICK_PARTICIPANT_FAILED);
    }

    return updatedRoom;
  }

  #buildParticipant({ participantId, participantName, participantHandle }) {
    return {
      participantId,
      participantName,
      participantHandle,
      isActive: true,
      joinedAt: new Date(),
      lastSeenAt: new Date(),
    };
  }

  #generateParticipantId() {
    return `participant-${generateObjectId().toString().slice(-8).toUpperCase()}`;
  }

  #generateRoomCode() {
    return `ROOM-${generateObjectId().toString().slice(-6).toUpperCase()}`;
  }
}

export { RoomService };
