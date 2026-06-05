import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { budgetInsertSchema } from '@/db/tables/budget.table';

export const createBudgetSchema = budgetInsertSchema.pick({
  category: true,
  limitAmount: true,
  month: true,
  year: true,
});

export type CreateBudgetBody = z.infer<typeof createBudgetSchema>;

export type CreateBudgetRequest = ValidatedRequest<{
  body: typeof createBudgetSchema;
}>;
