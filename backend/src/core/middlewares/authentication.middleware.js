import { SessionService } from "../../modules/sessions/session.service.js";
import { UserService } from "../../modules/users/user.service.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";
import { clearAuthCookies } from "../../shared/utils/cookie.utils.js";
import ApiError from "../http/api.error.js";
import { verifyToken } from "../security/jwt.security.js";
import asyncHandler from "./async-handler.middleware.js";

export const verifyAuthenticationJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers?.authorization || "";
  const token = req.cookies?.accessToken || authHeader.replace("Bearer ", "");

  if (!token) {
    throw ApiError.unauthorized(
      "Unauthorized request. Please try again later.",
    );
  }

  let decodedToken;

  try {
    decodedToken = verifyToken(token, TOKEN_TYPE.ACCESS);
  } catch {
    clearAuthCookies(res);
    throw ApiError.unauthorized(
      "Unauthorized request. Please try again later.",
    );
  }

  const { userId, sessionId, tokenVersion } = decodedToken;

  const user = await new UserService().findUserById(userId);
  const session = await new SessionService().findSessionById(userId, sessionId);

  if (!(user && session)) {
    clearAuthCookies(res);
    throw ApiError.unauthorized(
      "Unauthorized request. Please try again later.",
    );
  }

  if (session.userId.toString() !== userId) {
    clearAuthCookies(res);
    throw ApiError.unauthorized(
      "Unauthorized request. Please try again later.",
    );
  }

  if (new Date(session.refreshTokenExpiresAt) < new Date()) {
    clearAuthCookies(res);
    throw ApiError.unauthorized("Session expired. Please sign in again.");
  }

  if (session.tokenVersion !== tokenVersion) {
    clearAuthCookies(res);
    throw ApiError.unauthorized("Session invalidated. Please sign in again.");
  }

  req.user = user;
  req.session = session;

  next();
});
