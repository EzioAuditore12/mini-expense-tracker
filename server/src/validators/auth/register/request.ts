import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { insertUserSchema } from '@/db/tables/user.table';

export const registerRequestSchema = insertUserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export type RegisterRequestBody = z.infer<typeof registerRequestSchema>;

export type RegisterRequest = ValidatedRequest<{
  body: typeof registerRequestSchema;
}>;
