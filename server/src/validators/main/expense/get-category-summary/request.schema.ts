import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { budgetSchema } from '@/db/tables/budget.table';

export const expenseCategorySummaryQuerySchema = budgetSchema.pick({
  month: true,
  year: true,
}).partial();

export type ExpenseCategorySummaryQueryParams = z.infer<typeof expenseCategorySummaryQuerySchema>;

export type ExpenseCategorySummaryRequest = ValidatedRequest<{
  query: typeof expenseCategorySummaryQuerySchema;
}>;
