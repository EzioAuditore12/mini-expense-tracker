import { z } from 'zod';

import { budgetSchema } from '@/db/tables/budget.table';

export const createBudgetResponseSchema = budgetSchema;

export type CreateBudgetResponseBody = z.infer<
  typeof createBudgetResponseSchema
>;
