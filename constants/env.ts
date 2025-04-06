import { z } from 'zod';

const envSchema = z.object({
  APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const processEnv = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NODE_ENV: process.env.NODE_ENV,
} as const;

const env = envSchema.parse(processEnv);

export default env; 