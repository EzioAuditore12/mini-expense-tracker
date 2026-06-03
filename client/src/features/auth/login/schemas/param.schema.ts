import { z } from 'zod';

import { userSchema } from '@/features/common/schemas/user.schema';

export const loginParamSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().nonempty().max(16),
  });

export type LoginParams = z.infer<typeof loginParamSchema>;
