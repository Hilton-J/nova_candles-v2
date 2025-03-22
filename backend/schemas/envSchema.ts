import { z } from "zod";
import { ZodEnv } from "zod-env";

const envs = process.env;

const zodEnv = new ZodEnv(
  z.object({
    PORT: z.coerce.number(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    MONGO_URI: z.string(),
  }),
  envs
);

export default {
  PORT: zodEnv.get("PORT"),
  NODE_ENV: zodEnv.get("NODE_ENV"),
  MONGO_URI: zodEnv.get("MONGO_URI"),
};
