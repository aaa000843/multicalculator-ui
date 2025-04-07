import { z } from 'zod';

const envSchema = z.object({
  APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GA_TRACKING_ID: z.string().optional(),
  CONTACT_EMAIL: z.string().email(),
});

const processEnv = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NODE_ENV: process.env.NODE_ENV,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
} as const;

const env = envSchema.parse(processEnv);

export default env; 