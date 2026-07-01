import ApiError from "../../core/http/api.error.js";
import { hashToken } from "../../core/security/hash.security.js";
import { addMinutes } from "../../shared/utils/date.utils.js";
import { generateOTP } from "../../shared/utils/otp.utils.js";
import {
  MAX_VERIFICATION_ATTEMPTS,
  MAX_RESEND_COUNT,
  VERIFICATION_EXPIRY_MINUTES,
} from "./verification.contansts.js";
import VerificationMessages from "./verification.messages.js";
import { VerificationRepository } from "./verification.repositroy.js";

class VerificationService {
  #verificationRepo;
  constructor() {
    this.#verificationRepo = new VerificationRepository();
  }

  #isExpired(verification) {
    return verification.expiresAt < new Date();
  }

  #isMaxAttemptsReached(verification) {
    return verification.attempts >= MAX_VERIFICATION_ATTEMPTS;
  }

  #isMaxResendsReached(verification) {
    return verification.resendCount >= MAX_RESEND_COUNT;
  }

  async generateVerification(userId, type) {
    await this.#verificationRepo.deleteByUserIdAndType(userId, type);

    const otp = generateOTP();

    const payload = {
      userId,
      token: hashToken(String(otp)),
      type,
      expiresAt: addMinutes(VERIFICATION_EXPIRY_MINUTES[type]),
    };

    const verification = await this.#verificationRepo.create(payload);

    if (!verification) {
      throw ApiError.internalServerError(
        VerificationMessages.Errors.VERIFICATION_GENERATION_FAILED,
      );
    }

    return {
      otp,
      expiresAt: verification.expiresAt,
    };
  }

  async verifyVerification(userId, otp, type) {
    const verification = await this.#verificationRepo.findByUserIdAndType(
      userId,
      type,
    );

    if (!verification) {
      throw ApiError.notFound(
        VerificationMessages.Errors.VERIFICATION_NOT_FOUND,
      );
    }

    if (verification.verifiedAt) {
      throw ApiError.badRequest(
        VerificationMessages.Errors.VERIFICATION_ALREADY_COMPLETED,
      );
    }

    if (this.#isExpired(verification)) {
      await this.deleteVerification(userId, verification.id);

      throw ApiError.badRequest(VerificationMessages.Errors.OTP_EXPIRED);
    }

    if (this.#isMaxAttemptsReached(verification)) {
      await this.deleteVerification(userId, verification.id);

      throw ApiError.badRequest(
        VerificationMessages.Errors.MAX_ATTEMPTS_EXCEEDED,
      );
    }

    if (hashToken(String(otp)) !== verification.token) {
      await this.increaseVerificationAttempts(userId, verification.id);

      throw ApiError.badRequest(VerificationMessages.Errors.INVALID_OTP);
    }

    return verification;
  }

  async increaseVerificationAttempts(userId, id) {
    const verification = await this.#verificationRepo.findById(userId, id);

    return await this.#verificationRepo.update(userId, id, {
      attempts: verification.attempts + 1,
    });
  }

  async increaseResendCount(userId, id) {
    const verification = await this.#verificationRepo.findById(userId, id);

    return await this.#verificationRepo.update(userId, id, {
      resendCount: verification.resendCount + 1,
    });
  }

  async canResendVerification(userId, type) {
    const verification = await this.#verificationRepo.findByUserIdAndType(
      userId,
      type,
    );

    if (!verification) {
      return true;
    }

    return !this.#isMaxResendsReached(verification);
  }

  async checkResendLimit(userId, type) {
    const verification = await this.#verificationRepo.findByUserIdAndType(
      userId,
      type,
    );

    if (!verification) {
      return { canResend: true, resendsRemaining: MAX_RESEND_COUNT };
    }

    const canResend = !this.#isMaxResendsReached(verification);
    const resendsRemaining = Math.max(0, MAX_RESEND_COUNT - verification.resendCount);

    return { canResend, resendsRemaining };
  }

  async markVerificationAsVerified(userId, id) {
    return await this.#verificationRepo.update(userId, id, {
      verifiedAt: new Date(),
    });
  }

  async deleteVerification(userId, id) {
    return await this.#verificationRepo.delete(userId, id);
  }

  async deleteVerificationByType(userId, type) {
    return await this.#verificationRepo.deleteByUserIdAndType(userId, type);
  }

  async getVerificationByUserAndType(userId, type) {
    return await this.#verificationRepo.findByUserIdAndType(userId, type);
  }
}

export { VerificationService };
