import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { paginationSchema } from '../../pagination';
import { categoryEnumSchema } from '@/db/tables/enums/category.enum';

export const getAllExpensesSchema = paginationSchema.extend({
  category: categoryEnumSchema.optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type GetAllExpenses = z.infer<typeof getAllExpensesSchema>;

export type GetAllExpensesRequest = ValidatedRequest<{
  query: typeof getAllExpensesSchema;
}>;
