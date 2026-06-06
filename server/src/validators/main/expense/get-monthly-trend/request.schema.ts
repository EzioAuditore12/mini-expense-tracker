import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { budgetSchema } from '@/db/tables/budget.table';

export const expenseMonthlyTrendQuerySchema = budgetSchema
  .pick({
    year: true,
  })
  .partial();

export type ExpenseMonthlyTrendQueryParams = z.infer<
  typeof expenseMonthlyTrendQuerySchema
>;

export type ExpenseMonthlyTrendRequest = ValidatedRequest<{
  query: typeof expenseMonthlyTrendQuerySchema;
}>;
