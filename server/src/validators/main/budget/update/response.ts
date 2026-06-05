import { z } from 'zod';

import { budgetSchema } from '@/db/tables/budget.table';

export const updateBudgetResponseSchema = budgetSchema;

export type UpdateBudgetResponseBody = z.infer<
  typeof updateBudgetResponseSchema
>;
