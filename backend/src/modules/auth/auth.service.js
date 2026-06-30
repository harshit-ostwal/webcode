import ApiError from "../../core/http/api.error.js";
import { hashToken } from "../../core/security/hash.security.js";
import {
  generateAuthTokens,
  verifyToken,
} from "../../core/security/jwt.security.js";
import loggerService from "../../infrastructure/logger/logger.service.js";
import mailService from "../../infrastructure/mail/mail.service.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";
import { SessionService } from "../sessions/session.service.js";
import { UserService } from "../users/user.service.js";
import { VerificationType } from "../verifications/verification.contansts.js";
import { VerificationService } from "../verifications/verification.service.js";
import AuthMessages from "./auth.messages.js";

class AuthService {
  #userService;
  #sessionService;
  #verificationService;
  constructor() {
    this.#userService = new UserService();
    this.#sessionService = new SessionService();
    this.#verificationService = new VerificationService();
  }

  async signUpWithCredentials(data) {
    const user = await this.#userService.createUser(data);

    const { otp } = await this.#verificationService.generateVerification(
      user._id,
      VerificationType.VERIFY_EMAIL,
    );

    await mailService.sendVerificationEmail(user, otp);

    return user;
  }

  async signInWithCredentials(data) {
    const existingUser = await this.#userService.findByIdentifier(
      data.identifier,
    );

    if (!existingUser) {
      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_CREDENTIALS);
    }

    if (!existingUser.emailVerifiedAt) {
      throw ApiError.unauthorized(AuthMessages.Errors.EMAIL_NOT_VERIFIED);
    }

    const isPasswordValid = await existingUser.comparePassword(data.password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_CREDENTIALS);
    }

    const { session, accessToken, refreshToken } =
      await this.#sessionService.createSession(existingUser._id, data);

    await this.#sessionService.updateSessionById(
      existingUser._id,
      session._id,
      {
        lastLoginAt: new Date(),
      },
    );

    return { user: existingUser, accessToken, refreshToken };
  }

  async signOut(userId, sessionId) {
    return await this.#sessionService.deleteSessionById(userId, sessionId);
  }

  async signOutAllSessions(userId) {
    return await this.#sessionService.deleteSessionsByUserId(userId);
  }

  async refreshTokens(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized(AuthMessages.Errors.MISSING_REFRESH_TOKEN);
    }

    let decodedToken;

    try {
      decodedToken = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw ApiError.unauthorized(AuthMessages.Errors.SESSION_EXPIRED);
      }

      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_TOKEN);
    }

    const existingSession = await this.#sessionService.getSessionById(
      decodedToken.userId,
      decodedToken.sessionId,
    );

    if (!existingSession) {
      throw ApiError.unauthorized(AuthMessages.Errors.SESSION_EXPIRED);
    }

    if (existingSession.refreshTokenExpiresAt < new Date()) {
      await existingSession.deleteOne();
      throw ApiError.unauthorized(AuthMessages.Errors.SESSION_EXPIRED);
    }

    if (
      existingSession.userId.toString() !== decodedToken.userId ||
      existingSession.id.toString() !== decodedToken.sessionId ||
      Number(existingSession.tokenVersion) !== Number(decodedToken.tokenVersion)
    ) {
      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_TOKEN);
    }

    if (hashToken(refreshToken) !== existingSession.refreshToken) {
      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_TOKEN);
    }

    const tokenVersion = existingSession.tokenVersion + 1;

    const {
      accessToken,
      refreshToken: newRefreshToken,
      hashedRefreshToken,
      refreshTokenExpiresAt,
    } = generateAuthTokens({
      userId: existingSession.userId,
      sessionId: existingSession.id,
      tokenVersion,
    });

    existingSession.refreshToken = hashedRefreshToken;
    existingSession.refreshTokenExpiresAt = refreshTokenExpiresAt;
    existingSession.tokenVersion = tokenVersion;

    await existingSession.save();

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getCurrentUser(userId) {
    const user = await this.#userService.getUserById(userId);

    if (!user) {
      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_CREDENTIALS);
    }

    return user;
  }

  async verifyEmail(email, otp) {
    const existingUser = await this.#userService.findByEmail(email);

    if (!existingUser) {
      throw ApiError.notFound(AuthMessages.Errors.USER_NOT_FOUND);
    }

    if (existingUser.emailVerifiedAt) {
      throw ApiError.badRequest(AuthMessages.Errors.EMAIL_ALREADY_VERIFIED);
    }

    const verification = await this.#verificationService.verifyVerification(
      existingUser._id,
      otp,
      VerificationType.VERIFY_EMAIL,
    );

    await this.#verificationService.markVerificationAsVerified(
      existingUser._id,
      verification._id,
    );

    const user = await this.#userService.updateUser(existingUser._id, {
      emailVerifiedAt: new Date(),
    });

    await this.#verificationService.deleteVerification(
      existingUser._id,
      verification._id,
    );

    await mailService.sendWelcomeEmail(user);

    return user;
  }

  async resendVerificationEmail(email) {
    const existingUser = await this.#userService.findByEmail(email);

    if (!existingUser) {
      throw ApiError.notFound(AuthMessages.Errors.USER_NOT_FOUND);
    }

    if (existingUser.emailVerifiedAt) {
      throw ApiError.badRequest(AuthMessages.Errors.EMAIL_ALREADY_VERIFIED);
    }

    const { otp } = await this.#verificationService.generateVerification(
      existingUser._id,
      VerificationType.VERIFY_EMAIL,
    );

    await mailService.sendVerificationEmail(existingUser, otp);

    return true;
  }
}

export { AuthService };
