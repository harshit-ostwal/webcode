import { verifyToken } from "../../core/security/jwt.security.js";
import { UserService } from "../../modules/users/user.service.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";

const userService = new UserService();

/**
 * Socket.io authentication middleware.
 *
 * The client must send a Bearer token in the handshake auth object:
 *   io(url, { auth: { token: "Bearer <accessToken>" } })
 *
 * On success, attaches the user to socket.data.user for use in handlers.
 * On failure, calls next(Error) which triggers a connect_error on the client.
 *
 * @param {import("socket.io").Socket} socket
 * @param {Function} next
 */
const socketAuthMiddleware = async (socket, next) => {
  try {
    const authHeader = socket.handshake.auth?.token || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return next(new Error("Authentication required."));
    }

    const decoded = verifyToken(token, TOKEN_TYPE.ACCESS);
    const user = await userService.findUserById(decoded.userId);

    if (!user) {
      return next(new Error("User not found."));
    }

    // Attach user to socket — accessible in all handlers as socket.data.user
    socket.data.user = user;

    next();
  } catch {
    next(new Error("Invalid or expired token."));
  }
};

export { socketAuthMiddleware };
