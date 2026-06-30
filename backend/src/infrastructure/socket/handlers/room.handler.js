import ApiError from "../../../core/http/api.error.js";
import { RoomService } from "../../../modules/room/room.service.js";
import loggerService from "../../logger/logger.service.js";
import { SOCKET_EVENTS } from "../socket.constants.js";
import presenceStore from "../presence.store.js";

const roomService = new RoomService();

/**
 * Registers all room and presence socket event handlers for a connected socket.
 *
 * @param {import("socket.io").Server} io
 * @param {import("socket.io").Socket} socket
 */
const registerRoomHandlers = (io, socket) => {
  const user = socket.data.user;

  // ── room:join ─────────────────────────────────────────────────────────────
  // Client emits this when entering a room page.
  // Server validates the room, joins the Socket.io room, updates presence,
  // and broadcasts the updated participant list to everyone in the room.
  socket.on(SOCKET_EVENTS.ROOM_JOIN, async ({ roomCode }) => {
    try {
      if (!roomCode) {
        return socket.emit(SOCKET_EVENTS.ROOM_ERROR, {
          message: "Room code is required.",
        });
      }

      // Validate room exists and is active
      const room = await roomService.getRoomByCode(roomCode);

      // Join the Socket.io room (creates it if it doesn't exist)
      await socket.join(roomCode);

      // Update in-memory presence
      presenceStore.addParticipant(roomCode, socket.id, user);

      // Confirm to the joining socket only
      socket.emit(SOCKET_EVENTS.ROOM_JOINED, {
        roomCode,
        roomName: room.roomName,
        participants: presenceStore.getParticipants(roomCode),
      });

      // Broadcast updated participant list to EVERYONE in the room
      io.to(roomCode).emit(SOCKET_EVENTS.ROOM_PARTICIPANTS_UPDATED, {
        roomCode,
        participants: presenceStore.getParticipants(roomCode),
      });

      loggerService.info(
        `[Socket] ${user.username} joined room ${roomCode}`,
      );
    } catch (error) {
      loggerService.warn(
        `[Socket] ${user.username} failed to join room ${roomCode}: ${error.message}`,
      );
      socket.emit(SOCKET_EVENTS.ROOM_ERROR, { message: error.message });
    }
  });

  // ── room:leave ────────────────────────────────────────────────────────────
  // Client emits this when navigating away from a room page explicitly.
  // (Disconnects also handle cleanup automatically via socket.service.js)
  socket.on(SOCKET_EVENTS.ROOM_LEAVE, ({ roomCode }) => {
    try {
      if (!roomCode) return;

      socket.leave(roomCode);
      presenceStore.removeParticipant(roomCode, socket.id);

      // Also clear any lingering typing state for this socket
      presenceStore.setTyping(roomCode, socket.id, false);

      // Broadcast updated participant list to remaining members
      io.to(roomCode).emit(SOCKET_EVENTS.ROOM_PARTICIPANTS_UPDATED, {
        roomCode,
        participants: presenceStore.getParticipants(roomCode),
      });

      loggerService.info(
        `[Socket] ${user.username} left room ${roomCode}`,
      );
    } catch (error) {
      loggerService.warn(
        `[Socket] Error on room:leave for ${user.username}: ${error.message}`,
      );
    }
  });

  // ── presence:typing:start ─────────────────────────────────────────────────
  // Client emits this when the user starts typing in the editor.
  // Broadcast to OTHERS only (not back to sender — they already know they're typing).
  socket.on(SOCKET_EVENTS.PRESENCE_TYPING_START, ({ roomCode }) => {
    if (!roomCode) return;

    presenceStore.setTyping(roomCode, socket.id, true);

    socket.to(roomCode).emit(SOCKET_EVENTS.PRESENCE_TYPING_UPDATED, {
      roomCode,
      typingUsers: presenceStore.getTypingUsers(roomCode),
    });
  });

  // ── presence:typing:stop ──────────────────────────────────────────────────
  // Client emits this when the user stops typing (e.g. after a debounce timeout).
  socket.on(SOCKET_EVENTS.PRESENCE_TYPING_STOP, ({ roomCode }) => {
    if (!roomCode) return;

    presenceStore.setTyping(roomCode, socket.id, false);

    socket.to(roomCode).emit(SOCKET_EVENTS.PRESENCE_TYPING_UPDATED, {
      roomCode,
      typingUsers: presenceStore.getTypingUsers(roomCode),
    });
  });
};

export { registerRoomHandlers };
