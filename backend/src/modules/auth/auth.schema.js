import z from "zod/v4";
import {
  zCoerce,
  zEmail,
  zPassword,
  zString,
} from "../../shared/utils/zod.utils.js";

const signUpSchema = z.strictObject({
  username: zString("Username")
    .trim()
    .toLowerCase()
    .regex(/^(?=.{3,20}$)(?!.*[._]{2})[a-z0-9]+(?:[._][a-z0-9]+)*$/, {
      error: "Use 3-20 lowercase letters, numbers, dots, or underscores.",
    }),
  email: zEmail(),
  password: zPassword(),
});

const signInSchema = z.strictObject({
  identifier: zString("Identifier"),
  password: zPassword(),
});

const verifyEmailSchema = z.strictObject({
  email: zEmail(),
  otp: zCoerce("OTP", "number", {
    min: 100000,
    max: 999999,
    length: 6,
  }),
});

const resendVerificationEmailSchema = z.strictObject({
  email: zEmail(),
});

export {
  resendVerificationEmailSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
};
