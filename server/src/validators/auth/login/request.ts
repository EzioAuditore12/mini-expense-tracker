import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { userSchema } from '@/db/tables/user.table';

export const loginRequestSchema = userSchema.pick({
  email: true,
  password: true,
});

export type LoginRequestBody = z.infer<typeof loginRequestSchema>;

export type LoginRequest = ValidatedRequest<{
  body: typeof loginRequestSchema;
}>;
