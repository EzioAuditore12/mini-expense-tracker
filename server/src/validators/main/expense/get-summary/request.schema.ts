import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { budgetSchema } from '@/db/tables/budget.table';

export const expenseSummaryQuerySchema = budgetSchema
  .pick({
    month: true,
    year: true,
  })
  .partial();

export type ExpenseSummaryQueryParams = z.infer<
  typeof expenseSummaryQuerySchema
>;

export type ExpenseSummaryRequest = ValidatedRequest<{
  query: typeof expenseSummaryQuerySchema;
}>;
