import { z } from 'zod';

import { budgetSchema } from '../../budget.schema';

export const updateBudgetResponseSchema = budgetSchema;

export type UpdateBudgetResponse = z.infer<typeof updateBudgetResponseSchema>;
