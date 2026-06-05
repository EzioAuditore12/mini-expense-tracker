import { z } from 'zod';

import { categoryEnumSchema } from '../../expense/schemas/enums/categrory-enum.schema';

export const budgetSchema = z.object({
  id: z.base64(),
  userId: z.uuid(),
  category: categoryEnumSchema,
  limitAmount: z.number().positive(),
  month: z.number().min(1).max(12),
  year: z.number().min(1),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type Budget = z.infer<typeof budgetSchema>;
