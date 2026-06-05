import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { paginationSchema } from '../../pagination';
import { categoryEnumSchema } from '@/db/tables/enums/category.enum';

export const getAllBudgetsSchema = paginationSchema.extend({
  category: categoryEnumSchema.optional(),
  month: z.coerce
    .number()
    .int()
    .min(1, 'Month must be between 1 and 12')
    .max(12, 'Month must be between 1 and 12')
    .optional(),
  year: z.coerce
    .number()
    .int()
    .positive('Year must be a positive number')
    .optional(),
});

export type GetAllBudgets = z.infer<typeof getAllBudgetsSchema>;

export type GetAllBudgetsRequest = ValidatedRequest<{
  query: typeof getAllBudgetsSchema;
}>;
