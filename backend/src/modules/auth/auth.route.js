import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import authController from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./auth.schema.js";

const router = createRouter();

router.post(
  "/sign-up",
  validate(signUpSchema),
  authController.signUpWithCredentials,
);

router.post(
  "/sign-in",
  validate(signInSchema),
  authController.signInWithCredentials,
);

router.delete("/sign-out", authController.signOut);

router.delete("/sign-out-all", authController.signOutAllSessions);

router.post("/refresh-tokens", authController.refreshTokens);

export { router as authRouter };
