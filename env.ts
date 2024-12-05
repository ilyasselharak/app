import dotenv from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
dotenv.config();
export const env=createEnv({
    server: {
      HOST: z.string(),
      PORT:z.string().min(4),
      FRONT_END_URL: z.string().url(),
      VECTOR: z.string(),
      HASH: z.string(),
      DATABASE_URL: z.string().url(),
    },
    isServer: true,
    runtimeEnv: process.env,
  });