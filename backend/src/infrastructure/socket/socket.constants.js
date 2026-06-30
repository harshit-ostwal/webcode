const SOCKET_EVENTS = Object.freeze({
  // Lifecycle
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  // Room events — Client → Server
  ROOM_JOIN: "room:join",
  ROOM_LEAVE: "room:leave",

  // Room events — Server → Client
  ROOM_JOINED: "room:joined",
  ROOM_PARTICIPANTS_UPDATED: "room:participants:updated",
  ROOM_ERROR: "room:error",

  // Presence events — Client → Server
  PRESENCE_TYPING_START: "presence:typing:start",
  PRESENCE_TYPING_STOP: "presence:typing:stop",

  // Presence events — Server → Room (others only)
  PRESENCE_TYPING_UPDATED: "presence:typing:updated",
});

export { SOCKET_EVENTS };
