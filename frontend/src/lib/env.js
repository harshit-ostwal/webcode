import envSchema from "@/shared/schemas/env.schema";

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment variables:\n${parsedEnv.error.message}`);
}

const env = parsedEnv.success ? parsedEnv.data : null;

export default env;
