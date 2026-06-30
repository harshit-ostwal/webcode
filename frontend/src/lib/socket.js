import { io } from "socket.io-client";

/**
 * Socket.io client instance.
 *
 * - autoConnect: false — the socket does NOT connect on import.
 *   It connects only when socket.connect() is called (inside SocketProvider).
 *
 * - withCredentials: true — sends cookies with the WebSocket handshake,
 *   matching the backend CORS config.
 *
 * - auth: function form — called right before each connect/reconnect,
 *   so it always picks up the latest token from localStorage.
 *   The backend socket.middleware.js reads socket.handshake.auth.token.
 */
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  auth: (cb) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken") ?? ""
        : "";
    cb({ token: token ? `Bearer ${token}` : "" });
  },
});

export default socket;
