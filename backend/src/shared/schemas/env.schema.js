import { z } from "zod/v4";
import { zCoerce, zEnum, zString, zUrl } from "../../shared/utils/zod.utils.js";

const envSchema = z
  .strictObject({
    NODE_ENV: zEnum("NODE_ENV", ["development", "production", "testing"]),
    DOTENV_DEBUG: zCoerce("DOTENV_DEBUG", "boolean"),
    LOG_LEVEL: zEnum("LOG_LEVEL", [
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
    ]),
    PORT: zCoerce("PORT", "number", {
      min: 1,
      max: 65535,
      int: true,
      positive: true,
    }),
    ALLOWED_ORIGINS: zString("ALLOWED_ORIGINS", 1, 2048),

    BACKEND_URL: zUrl("BACKEND_URL", 1, 2048),
    FRONTEND_URL: zUrl("FRONTEND_URL", 1, 2048),

    DATABASE_URL: zString("DATABASE_URL", 1, 2048),

    COOKIE_SECRET_KEY: zString("COOKIE_SECRET_KEY", 1, 2048),

    ACCESS_TOKEN_SECRET: zString("ACCESS_TOKEN_SECRET", 1, 512),
    ACCESS_TOKEN_EXPIRY: zString("ACCESS_TOKEN_EXPIRY", 1, 32),
    REFRESH_TOKEN_SECRET: zString("REFRESH_TOKEN_SECRET", 1, 512),
    REFRESH_TOKEN_EXPIRY: zString("REFRESH_TOKEN_EXPIRY", 1, 32),
    REFRESH_TOKEN_EXPIRY_MS: zCoerce("REFRESH_TOKEN_EXPIRY_MS", "number", {
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      int: true,
      positive: true,
    }),
  })
  .strip();

export default envSchema;
