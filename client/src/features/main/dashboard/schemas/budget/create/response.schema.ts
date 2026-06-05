import { z } from 'zod';

import { budgetSchema } from '../../budget.schema';

export const createBudgetResponseSchema = budgetSchema;

export type CreateBudgetResponse = z.infer<typeof createBudgetResponseSchema>;
