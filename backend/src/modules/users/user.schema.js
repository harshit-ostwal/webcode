import z from "zod/v4";
import { zString } from "../../shared/utils/zod.utils.js";

const userSchema = z.strictObject({
  fullName: zString("Full Name").optional(),
  username: zString("Username", 3, 30).optional(),
});

const updateUserSchema = userSchema.partial();

export { updateUserSchema };
