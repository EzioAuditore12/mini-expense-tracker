import { z } from 'zod';

import { publicUserSchema } from '@/db/tables/user.table';

export const loginResponseSchema = z.object({
  user: publicUserSchema,
  tokens: z.object({
    accessToken: z.jwt(),
    refreshToken: z.jwt(),
  }),
});

export type LoginResponseBody = z.infer<typeof loginResponseSchema>;
