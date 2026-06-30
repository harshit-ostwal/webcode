import createRouter from "../core/factories/router.factory.js";
import ApiResponse from "../core/http/api.response.js";
import { specs, swaggerTheme, swaggerUi } from "../docs/swagger.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import healthRoute from "./health.route.js";

const router = createRouter();

// Swagger UI for API documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerTheme));

/**
 * @route GET /
 * @desc  Welcome message for the API
 * @access Public
 */
router.get("/", (_, res) => {
  return ApiResponse.ok(null, `Welcome to the ${APP_NAME} API Service`).send(
    res,
  );
});

/**
 * @route GET /health *
 * @desc  Health check endpoint
 * @access Public
 */
router.use("/health", healthRoute);

/**
 * @route /users
 * @desc  User-related routes
 * @access Private (requires authentication)
 */
router.use(
  "/users",
  (await import("../modules/users/user.route.js")).userRouter,
);

/**
 * @route /auth
 * @desc  Authentication-related routes
 * @access Public & Private (depending on the route)
 */
router.use("/auth", (await import("../modules/auth/auth.route.js")).authRouter);

/**
 * @route /sessions
 * @desc  Session-related routes
 * @access Private (requires authentication)
 */
router.use(
  "/sessions",
  (await import("../modules/sessions/session.route.js")).SessionRouter,
);

router.use(
  "/rooms",
  (await import("../modules/room/room.route.js")).RoomRouter,
);

export default router;
