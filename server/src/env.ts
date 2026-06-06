import dotenv from 'dotenv';

import { z } from 'zod';

dotenv.config();

/**
 * Zod schema for validating and coercing environment variables at startup.
 * If any variable is missing or invalid, the app crashes immediately with a
 * descriptive error — preventing silent misconfiguration from reaching runtime.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  HOST: z.string().min(1).default('localhost'),

  PORT: z.coerce.number().int().positive().default(8000),

  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce
    .number()
    .int()
    .positive()
    .default(1000),

  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),

  // JWT secrets & durations for access/refresh token pair strategy
  ACCESS_SECRET_KEY: z.string().default('demo_access_secret'),
  ACCESS_EXPIRATION_DURATION: z.string().default('15m'),

  REFRESH_SECRET_KEY: z.string().default('demo_refresh_secret'),
  REFRESH_EXPIRATION_DURATION: z.string().default('7d'),

  // Test Email, Password and tokens for api docs
  TEST_USER_EMAIL: z.email().default('user@demo.com'),
  TEST_USER_PASSWORD: z.string().default('Demo@123'),
  TEST_USER_ID: z.uuid().default('042f64b3-c7a6-43f6-a26e-9f4495c0108c'),

  TEST_ACESS_TOKEN: z
    .jwt()
    .default(
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNDJmNjRiMy1jN2E2LTQzZjYtYTI2ZS05ZjQ0OTVjMDEwOGMiLCJpYXQiOjE3ODA3NTM4OTQsImV4cCI6MTc4MzM0NTg5NH0.WHtewtKPf3ex0uqJa6MMuxevi5mmBJwEQfZi2B3UcCE',
    ),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = {
  ...parsedEnv.data,
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isTest: parsedEnv.data.NODE_ENV === 'test',
};
