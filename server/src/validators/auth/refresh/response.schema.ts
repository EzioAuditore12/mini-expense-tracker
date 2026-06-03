import { z } from 'zod';

export const refreshResponseSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

export type RefreshResponseBody = z.infer<typeof refreshResponseSchema>;
