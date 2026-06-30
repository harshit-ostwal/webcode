const RoomMessages = {
  Errors: {
    ROOM_NOT_FOUND: "Room not found, Please try again later.",
    ROOM_ALREADY_EXISTS: "Room already exists, Please try again later.",
    CREATE_ROOM_FAILED: "Failed to create room, Please try again later.",
    FETCH_ROOM_FAILED: "Failed to fetch room, Please try again later.",
    JOIN_ROOM_FAILED: "Failed to join room, Please try again later.",
    RENAME_ROOM_FAILED: "Failed to rename room, Please try again later.",
    CLOSE_ROOM_FAILED: "Failed to close room, Please try again later.",
    KICK_PARTICIPANT_FAILED: "Failed to kick participant, Please try again later.",
    PARTICIPANT_NOT_FOUND: "Participant not found, Please try again later.",
    UNAUTHORIZED_ROOM_ACTION:
      "You are not authorized to perform this action.",
  },
  Success: {
    CREATE_ROOM_SUCCESS: "Room created successfully.",
    FETCH_ROOM_SUCCESS: "Room fetched successfully.",
    JOIN_ROOM_SUCCESS: "Room joined successfully.",
    RENAME_ROOM_SUCCESS: "Room renamed successfully.",
    CLOSE_ROOM_SUCCESS: "Room closed successfully.",
    KICK_PARTICIPANT_SUCCESS: "Participant kicked successfully.",
  },
};

export { RoomMessages };
