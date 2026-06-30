import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import authController from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./auth.schema.js";

const router = createRouter();

/**
 * @route POST /auth/sign-up
 * @desc  Sign up a new user with credentials
 * @access Public
 */
router.post(
  "/sign-up",
  validate(signUpSchema),
  authController.signUpWithCredentials,
);

/**
 * @route POST /auth/sign-in
 * @desc  Sign in a user with credentials
 * @access Public
 */
router.post(
  "/sign-in",
  validate(signInSchema),
  authController.signInWithCredentials,
);

/**
 * @route GET /auth/refresh-tokens
 * @desc  Refresh access and refresh tokens for an authenticated user
 * @access Public
 */
router.get("/refresh-tokens", authController.refreshTokens);

/**
 * @route GET /auth/me
 * @desc  Get the current authenticated user's information
 * @access Private (requires authentication)
 */
router.use(verifyAuthenticationJWT);

/**
 * @route GET /auth/me
 * @desc  Get the current authenticated user's information
 * @access Private (requires authentication)
 */
router.get("/me", authController.getCurrentUser);

/**
 * @route DELETE /auth/sign-out
 * @desc  Sign out the current authenticated user
 * @access Private (requires authentication)
 */
router.delete("/sign-out", authController.signOut);

/**
 * @route DELETE /auth/sign-out/all
 * @desc  Sign out the current authenticated user from all sessions
 * @access Private (requires authentication)
 */
router.delete("/sign-out/all", authController.signOutAllSessions);

export { router as authRouter };
