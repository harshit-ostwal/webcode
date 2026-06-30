import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import sessionController from "./session.controller.js";
import { sessionIdSchema } from "./session.schema.js";

const router = createRouter();

router
  .route("/")
  .get(sessionController.getSessionByUserId)
  .delete(sessionController.deleteSessionsByUserId);

router
  .route("/:id")
  .all(validate(sessionIdSchema, ValidationSource.PARAMS))
  .get(sessionController.getSessionById)
  .delete(sessionController.deleteSessionById);

export { router as SessionRouter };
