import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { budgetSchema } from '@/db/tables/budget.table';

export const budgetStatusQuerySchema = budgetSchema.pick({
  month: true,
  year: true,
});

export type BudgetStatusQueryParams = z.infer<typeof budgetStatusQuerySchema>;

export type BudgetStatusRequest = ValidatedRequest<{
  query: typeof budgetStatusQuerySchema;
}>;
