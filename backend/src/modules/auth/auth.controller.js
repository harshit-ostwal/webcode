import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
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

    return ApiResponse.ok(
      {
        user: new AuthDto(user),
        accessToken,
        refreshToken,
      },
      AuthMessages.Success.SIGN_IN_SUCCESS,
    ).send(res);
  });

  signOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.session.id;

    await this.#authService.signOut(userId, sessionId);

    return ApiResponse.ok(null, AuthMessages.Success.SIGN_OUT_SUCCESS).send(
      res,
    );
  });

  signOutAllSessions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#authService.signOutAllSessions(userId);

    return ApiResponse.ok(
      null,
      AuthMessages.Success.SIGN_OUT_ALL_SESSIONS_SUCCESS,
    ).send(res);
  });

  refreshTokens = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.#authService.refreshTokens(refreshToken);

    return ApiResponse.ok(
      {
        accessToken,
        refreshToken: newRefreshToken,
      },
      AuthMessages.Success.REFRESH_TOKEN_SUCCESS,
    ).send(res);
  });
}

export default new AuthController();
