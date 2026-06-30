const VerificationMessages = {
  Errors: {
    VERIFICATION_NOT_FOUND:
      "Verification request not found. Please request a new verification.",
    INVALID_OTP: "Invalid OTP. Please check the OTP and try again.",
    OTP_EXPIRED: "OTP has expired. Please request a new OTP.",
    MAX_ATTEMPTS_EXCEEDED:
      "Maximum verification attempts exceeded. Please request a new OTP.",
    VERIFICATION_ALREADY_COMPLETED: "Verification has already been completed.",
    VERIFICATION_GENERATION_FAILED:
      "Failed to generate verification. Please try again later.",
    INVALID_VERIFICATION_TYPE: "Invalid verification type.",
  },
  Success: {
    OTP_SENT: "OTP has been sent successfully.",
    OTP_VERIFIED: "OTP verified successfully.",
  },
};

export default VerificationMessages;
