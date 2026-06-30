import { Server } from "socket.io";
import { ALLOWED_ORIGINS } from "../../config/env.config.js";
import loggerService from "../logger/logger.service.js";
import { SOCKET_EVENTS } from "./socket.constants.js";
import { socketAuthMiddleware } from "./socket.middleware.js";
import presenceStore from "./presence.store.js";

/** @type {import("socket.io").Server | null} */
let io = null;

/**
 * Initializes the Socket.io server and attaches it to the given HTTP server.
 * Must be called once in index.js after the HTTP server is created.
 *
 * @param {import("node:http").Server} httpServer
 * @returns {import("socket.io").Server}
 */
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: ALLOWED_ORIGINS
        ? ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
        : false,
      credentials: true,
      methods: ["GET", "POST"],
    },
    // Allows clients to reconnect and recover missed events (up to 2 min)
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: false,
    },
  });

  // Apply JWT auth to every incoming socket connection
  io.use(socketAuthMiddleware);

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    const user = socket.data.user;
    loggerService.info(
      `[Socket] Connected: ${user.username} (socketId: ${socket.id})`,
    );

    // ── Disconnect Handler ──────────────────────────────────────────────────
    // Fires when the client loses connection (tab close, network drop, etc.)
    // We clean up all presence state for this socket across all rooms.
    socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      loggerService.info(
        `[Socket] Disconnected: ${user.username} (socketId: ${socket.id}) — reason: ${reason}`,
      );

      // Find all rooms this socket was in and broadcast updated participant list
      const roomsForSocket = presenceStore.getRoomsForSocket(socket.id);

      for (const roomCode of roomsForSocket) {
        presenceStore.removeParticipant(roomCode, socket.id);

        io.to(roomCode).emit(SOCKET_EVENTS.ROOM_PARTICIPANTS_UPDATED, {
          roomCode,
          participants: presenceStore.getParticipants(roomCode),
        });
      }
    });

    // Room and presence handlers will be registered here in Phase 2.
    // e.g. registerRoomHandlers(io, socket);
  });

  loggerService.info("[Socket] Socket.io server initialized successfully.");

  return io;
};

/**
 * Returns the initialized Socket.io server instance.
 * Throws if called before initSocket().
 *
 * @returns {import("socket.io").Server}
 */
const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io is not initialized. Call initSocket(httpServer) first.",
    );
  }
  return io;
};

export { initSocket, getIO };
