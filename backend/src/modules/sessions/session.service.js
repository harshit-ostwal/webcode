import ApiError from "../../core/http/api.error.js";
import { generateAuthTokens } from "../../core/security/jwt.security.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import generateObjectId from "../../shared/utils/objectId.utils.js";
import { SessionMessages } from "./session.messages.js";
import { SessionRepository } from "./session.repository.js";

class SessionService {
  #sessionRepo;
  constructor() {
    this.#sessionRepo = new SessionRepository();
  }

  async findSessionById(userId, id) {
    return await this.#sessionRepo.findById(userId, id);
  }

  async getSessionById(userId, id) {
    const session = await this.#sessionRepo.findById(userId, id);

    if (!session) {
      throw ApiError.notFound(SessionMessages.Errors.SESSION_NOT_FOUND);
    }

    return session;
  }

  async getSessionByUserId(userId) {
    const sessions = await this.#sessionRepo.findByUserId(userId);

    if (!sessions || sessions.length === 0) {
      throw ApiError.notFound(SessionMessages.Errors.FETCH_SESSIONS_FAILED);
    }

    return sessions;
  }

  async createSession(userId, data) {
    const sessionId = generateObjectId();

    const {
      accessToken,
      hashedRefreshToken,
      refreshToken,
      refreshTokenExpiresAt,
    } = generateAuthTokens({ userId, sessionId, tokenVersion: 0 });

    const payload = {
      _id: sessionId,
      userId,
      refreshToken: hashedRefreshToken,
      refreshTokenExpiresAt,
      ...data,
    };

    const session = await this.#sessionRepo.create(payload);

    if (!session) {
      throw ApiError.badRequest(SessionMessages.Errors.CREATE_SESSION_FAILED);
    }

    return {
      session,
      accessToken,
      refreshToken,
    };
  }

  async updateSessionById(userId, id, data) {
    const existingSession = await this.getSessionById(userId, id);

    const changedFields = getChangedFields(existingSession, data);

    if (Object.keys(changedFields).length === 0) {
      return existingSession;
    }

    const session = await this.#sessionRepo.update(userId, id, changedFields);

    if (!session) {
      throw ApiError.notFound(SessionMessages.Errors.UPDATE_SESSION_FAILED);
    }

    return session;
  }

  async deleteSessionById(userId, id) {
    await this.getSessionById(userId, id);

    const session = await this.#sessionRepo.delete(userId, id);

    if (!session) {
      throw ApiError.notFound(SessionMessages.Errors.DELETE_SESSION_FAILED);
    }

    return session;
  }

  async deleteSessionsByUserId(userId) {
    await this.getSessionByUserId(userId);

    const sessions = await this.#sessionRepo.deleteByUserId(userId);

    if (sessions.deletedCount === 0) {
      throw ApiError.notFound(SessionMessages.Errors.DELETE_SESSIONS_FAILED);
    }

    return sessions;
  }

  async deleteExpiredSessions() {
    return await this.#sessionRepo.deleteExpired();
  }
}

export { SessionService };
