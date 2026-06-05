import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { budgetUpdateSchema } from '@/db/tables/budget.table';
import { budgetParamSchema } from '../param';

export const updateBudgetSchema = budgetUpdateSchema.pick({
  limitAmount: true,
});

export type UpdateBudgetBody = z.infer<typeof updateBudgetSchema>;

export type UpdateBudgetRequest = ValidatedRequest<{
  params: typeof budgetParamSchema;
  body: typeof updateBudgetSchema;
}>;
