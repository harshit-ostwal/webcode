const SessionMessages = {
  Errors: {
    SESSION_NOT_FOUND: "Session not found, Please try again later.",
    SESSION_ALREADY_EXISTS: "Session already exists, Please try again later.",
    FETCH_SESSION_FAILED: "Failed to fetch session, Please try again later.",
    FETCH_SESSIONS_FAILED: "Failed to fetch sessions, Please try again later.",
    CREATE_SESSION_FAILED: "Failed to create session, Please try again later.",
    UPDATE_SESSION_FAILED: "Failed to update session, Please try again later.",
    DELETE_SESSION_FAILED: "Failed to delete session, Please try again later.",
    DELETE_SESSIONS_FAILED:
      "Failed to delete sessions, Please try again later.",
    INVALID_REFRESH_TOKEN: "Invalid refresh token, Please try again later.",
  },
  Success: {
    FETCH_SESSION_SUCCESS: "Session fetched successfully.",
    FETCH_SESSIONS_SUCCESS: "Sessions fetched successfully.",
    DELETE_SESSION_SUCCESS: "Session deleted successfully.",
    DELETE_SESSIONS_SUCCESS: "Sessions deleted successfully.",
  },
};

export { SessionMessages };
