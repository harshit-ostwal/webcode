import z from "zod/v4";
import {
  zCoerce,
  zEmail,
  zPassword,
  zString,
} from "../../shared/utils/zod.utils.js";

const signUpSchema = z.strictObject({
  username: zString("Username"),
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
