import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  client: {
    VITE_PUBLIC_SERVER_URL: z.url().default('http://localhost:8000'),
    VITE_PUBLIC_TEST_EMAIL: z.email().default('user@demo.com'),
    VITE_PUBLIC_TEST_PASSWORD: z.string().default('Demo@123'),
  },
  clientPrefix: 'VITE_',
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
