import { z } from 'zod';

import { publicUserSchema } from '@/db/tables/user.table';

export const registerResponseSchema = z.object({
  user: publicUserSchema,
  tokens: z.object({
    accessToken: z.jwt(),
    refreshToken: z.jwt(),
  }),
});

export type RegisterResponseBody = z.infer<typeof registerResponseSchema>;
