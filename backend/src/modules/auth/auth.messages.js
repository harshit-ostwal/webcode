const AuthMessages = {
  Errors: {
    USER_ALREADY_EXISTS:
      "User already exists, Please try with a different email or username.",
    INVALID_CREDENTIALS:
      "Invalid credentials. Please check your credentials and try again.",
    INVALID_TOKEN: "Invalid token. Please check your token and try again.",
    MISSING_REFRESH_TOKEN:
      "Refresh token is required. Please provide a refresh token.",
    EMAIL_NOT_VERIFIED:
      "Email not verified. Please check your email for verification.",
  },
  Success: {
    SIGN_UP_SUCCESS:
      "Sign up successful. Please check your email for verification.",
    SIGN_IN_SUCCESS: "Sign in successful. Welcome back!",
    SIGN_OUT_SUCCESS: "Sign out successful. You have been logged out.",
    SIGN_OUT_ALL_SESSIONS_SUCCESS:
      "Sign out from all sessions successful. You have been logged out from all devices.",
    REFRESH_TOKEN_SUCCESS:
      "Refresh token successful. New access token and refresh token have been generated.",
  },
};

export default AuthMessages;
