import { z } from 'zod';

import { userSchema } from '@/features/common/schemas/user.schema';

export const registerParamSchema = userSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    password: z.string().nonempty().max(16),
  });

export type RegisterParams = z.infer<typeof registerParamSchema>;
