import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import userController from "./user.controller.js";
import { updateUserSchema } from "./user.schema.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);

router
  .route("/")
  .get(userController.getAllUsers)
  .patch(validate(updateUserSchema), userController.updateUser)
  .delete(userController.deleteUser);

export { router as userRouter };
