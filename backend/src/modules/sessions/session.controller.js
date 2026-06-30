import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { SessionDto } from "./session.dto.js";
import { SessionMessages } from "./session.messages.js";
import { SessionService } from "./session.service.js";

class SessionController {
  #sessionService;
  constructor() {
    this.#sessionService = new SessionService();
  }

  getSessionById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const session = await this.#sessionService.getSessionById(userId, id);

    return ApiResponse.ok(
      session ? new SessionDto(session) : null,
      SessionMessages.Success.FETCH_SESSION_SUCCESS,
    ).send(res);
  });

  getSessionByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const sessions = await this.#sessionService.getSessionByUserId(userId);

    return ApiResponse.ok(
      Array.isArray(sessions)
        ? sessions.map((session) => new SessionDto(session))
        : new SessionDto(sessions),
      SessionMessages.Success.FETCH_SESSIONS_SUCCESS,
    ).send(res);
  });

  deleteSessionById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    await this.#sessionService.deleteSessionById(userId, id);

    return ApiResponse.ok(
      null,
      SessionMessages.Success.DELETE_SESSION_SUCCESS,
    ).send(res);
  });

  deleteSessionsByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#sessionService.deleteSessionsByUserId(userId);

    return ApiResponse.ok(
      null,
      SessionMessages.Success.DELETE_SESSIONS_SUCCESS,
    ).send(res);
  });
}

export default new SessionController();
