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
    SESSION_EXPIRED: "Session expired. Please sign in again.",
    EMAIL_VERIFICATION_FAILED:
      "Email verification failed. Please check your email for verification.",
    EMAIL_SEND_FAILED:
      "Failed to send email. Please try again later or contact support.",
    PASSWORD_RESET_FAILED:
      "Password reset failed. Please check your email for password reset instructions.",
    PASSWORD_RESET_TOKEN_EXPIRED:
      "Password reset token has expired. Please request a new password reset.",
    PASSWORD_RESET_TOKEN_INVALID:
      "Password reset token is invalid. Please request a new password reset.",
    USERNAME_UNAVAILABLE:
      "Username is unavailable. Please choose a different username.",
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
    CURRENT_USER_FETCH_SUCCESS: "Current user fetched successfully.",
    USERNAME_AVAILABLE: "Username is available.",
  },
};

export default AuthMessages;
