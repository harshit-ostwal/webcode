import z from "zod/v4";
import { zPassword, zString } from "../../shared/utils/zod.utils.js";

const signUpSchema = z.strictObject({
  username: zString("Username"),
  email: zString("Email").email("Invalid email address"),
  password: zPassword(),
});

const signInSchema = z.strictObject({
  identifier: zString("Identifier"),
  password: zPassword(),
});

export { signUpSchema, signInSchema };
