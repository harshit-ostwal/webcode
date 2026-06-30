import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import {
  clearAuthCookies,
  setAuthCookies,
} from "../../shared/utils/cookie.utils.js";
import { getRequestInfo } from "../../shared/utils/request.utils.js";
import { AuthDto } from "./auth.dto.js";
import AuthMessages from "./auth.messages.js";
import { AuthService } from "./auth.service.js";

class AuthController {
  #authService;
  constructor() {
    this.#authService = new AuthService();
  }

  signUpWithCredentials = asyncHandler(async (req, res) => {
    const data = req.body;
    const { ipAddress, userAgent } = getRequestInfo(req);

    data.ipAddress = ipAddress;
    data.userAgent = userAgent;

    const user = await this.#authService.signUpWithCredentials(data);

    return ApiResponse.created(
      new AuthDto(user),
      AuthMessages.Success.SIGN_UP_SUCCESS,
    ).send(res);
  });

  signInWithCredentials = asyncHandler(async (req, res) => {
    const data = req.body;
    const { ipAddress, userAgent } = getRequestInfo(req);

    data.ipAddress = ipAddress;
    data.userAgent = userAgent;

    const { user, accessToken, refreshToken } =
      await this.#authService.signInWithCredentials(data);

    setAuthCookies(res, accessToken, refreshToken);

    return ApiResponse.ok(
      new AuthDto(user),
      AuthMessages.Success.SIGN_IN_SUCCESS,
    ).send(res);
  });

  signOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.session.id;

    await this.#authService.signOut(userId, sessionId);

    clearAuthCookies(res);

    return ApiResponse.ok(null, AuthMessages.Success.SIGN_OUT_SUCCESS).send(
      res,
    );
  });

  signOutAllSessions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#authService.signOutAllSessions(userId);

    clearAuthCookies(res);

    return ApiResponse.ok(
      null,
      AuthMessages.Success.SIGN_OUT_ALL_SESSIONS_SUCCESS,
    ).send(res);
  });

  refreshTokens = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await this.#authService.refreshTokens(refreshToken);

      setAuthCookies(res, accessToken, newRefreshToken);

      return ApiResponse.ok(
        accessToken,
        AuthMessages.Success.REFRESH_TOKEN_SUCCESS,
      ).send(res);
    } catch (error) {
      if (error.statusCode === 401) {
        clearAuthCookies(res);
      }

      throw error;
    }
  });

  getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await this.#authService.getCurrentUser(userId);

    return ApiResponse.ok(
      new AuthDto(user),
      AuthMessages.Success.CURRENT_USER_FETCH_SUCCESS,
    ).send(res);
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const user = await this.#authService.verifyEmail(email, otp);

    return ApiResponse.ok(
      new AuthDto(user),
      AuthMessages.Success.EMAIL_VERIFICATION_SUCCESS,
    ).send(res);
  });

  resendVerificationEmail = asyncHandler(async (req, res) => {
    const email = req.body.email;

    await this.#authService.resendVerificationEmail(email);

    return ApiResponse.ok(
      null,
      AuthMessages.Success.EMAIL_VERIFICATION_RESEND_SUCCESS,
    ).send(res);
  });

  checkUsernameAvailability = asyncHandler(async (req, res) => {
    const username = req.body.username;

    const isAvailable =
      await this.#authService.checkUsernameAvailability(username);

    return ApiResponse.ok(
      isAvailable,
      isAvailable
        ? AuthMessages.Success.USERNAME_AVAILABLE
        : AuthMessages.Errors.USERNAME_UNAVAILABLE,
    ).send(res);
  });
}

export default new AuthController();
