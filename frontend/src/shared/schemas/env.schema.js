import z from "zod/v4";
import { zEnum, zString, zUrl } from "../utils/zod.utils";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: zUrl("NEXT_PUBLIC_API_URL"),
  NEXT_PUBLIC_HEALTH_CHECK_URL: zUrl("NEXT_PUBLIC_HEALTH_CHECK_URL"),
  NEXT_PUBLIC_APP_NAME: zString("NEXT_PUBLIC_APP_NAME"),
  NEXT_PUBLIC_NODE_ENV: zEnum("NEXT_PUBLIC_NODE_ENV", [
    "development",
    "production",
    "testing",
  ]),
});

export default envSchema;
