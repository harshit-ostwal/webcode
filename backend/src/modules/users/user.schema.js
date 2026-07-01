import z from "zod/v4";
import { zString } from "../../shared/utils/zod.utils.js";

const userSchema = z.strictObject({
  fullName: zString("Full Name").optional(),
  username: zString("Username", 3, 30).optional(),
});

const checkUsernameSchema = z.strictObject({
  username: zString("Username")
    .trim()
    .toLowerCase()
    .regex(/^(?=.{3,20}$)(?!.*[._]{2})[a-z0-9]+(?:[._][a-z0-9]+)*$/, {
      error: "Use 3-20 lowercase letters, numbers, dots, or underscores.",
    }),
});

const updateUserSchema = userSchema.partial();

export { updateUserSchema, checkUsernameSchema };
