import { tokensSchema } from '@/features/common/schemas/token.schema';
import { userSchema } from '@/features/common/schemas/user.schema';
import { z } from 'zod';

export const loginResponseSchema = z.object({
  user: userSchema,
  tokens: tokensSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
