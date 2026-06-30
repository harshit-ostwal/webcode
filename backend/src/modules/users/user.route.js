import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { objectIdSchema } from "../../shared/schemas/id.schema.js";
import userController from "./user.controller.js";
import { updateUserSchema } from "./user.schema.js";

const router = createRouter();

router.get("/", userController.getAllUsers);

router
  .route("/:id")
  .all(validate(objectIdSchema, ValidationSource.PARAMS))
  .get(userController.getUserById)
  .patch(validate(updateUserSchema), userController.updateUser)
  .delete(userController.deleteUser);

export { router as userRouter };
