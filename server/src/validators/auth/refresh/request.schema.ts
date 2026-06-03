import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

export const refreshRequestSchema = z.object({
  refreshToken: z.jwt(),
});

export type RefreshRequestBody = z.infer<typeof refreshRequestSchema>;

export type RefreshRequest = ValidatedRequest<{
  body: typeof refreshRequestSchema;
}>;
