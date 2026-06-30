import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { RoomDto } from "./room.dto.js";
import { RoomMessages } from "./room.messages.js";
import { RoomService } from "./room.service.js";

class RoomController {
  #roomService;
  constructor() {
    this.#roomService = new RoomService();
  }

  createRoom = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const room = await this.#roomService.createRoom(userId, req.body);

    return ApiResponse.created(
      new RoomDto(room),
      RoomMessages.Success.CREATE_ROOM_SUCCESS,
    ).send(res);
  });

  joinRoom = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const room = await this.#roomService.joinRoom(userId, req.body);

    return ApiResponse.ok(
      new RoomDto(room),
      RoomMessages.Success.JOIN_ROOM_SUCCESS,
    ).send(res);
  });

  getRoomById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const room = await this.#roomService.getRoomById(userId, id);

    return ApiResponse.ok(
      room ? new RoomDto(room) : null,
      RoomMessages.Success.FETCH_ROOM_SUCCESS,
    ).send(res);
  });

  renameRoom = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const room = await this.#roomService.renameRoom(userId, id, req.body);

    return ApiResponse.ok(
      new RoomDto(room),
      RoomMessages.Success.RENAME_ROOM_SUCCESS,
    ).send(res);
  });

  closeRoom = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const room = await this.#roomService.closeRoom(userId, id);

    return ApiResponse.ok(
      new RoomDto(room),
      RoomMessages.Success.CLOSE_ROOM_SUCCESS,
    ).send(res);
  });

  kickParticipant = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const participantId = req.params.participantId;
    const userId = req.user.id;

    const room = await this.#roomService.kickParticipant(
      userId,
      id,
      participantId,
    );

    return ApiResponse.ok(
      new RoomDto(room),
      RoomMessages.Success.KICK_PARTICIPANT_SUCCESS,
    ).send(res);
  });
}

export default new RoomController();
