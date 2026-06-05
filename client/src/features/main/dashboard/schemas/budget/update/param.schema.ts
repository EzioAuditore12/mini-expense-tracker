import { z } from 'zod';
import { isNumeric } from 'validator';

import { budgetSchema } from '../../budget.schema';

export const updateBudgetParamSchema = budgetSchema.pick({ limitAmount: true }).extend({
  limitAmount: z
    .string()
    .refine((val) => isNumeric(val), { error: 'Amount must be numeric' })
    .refine((val) => Number(val) > 0, {
      message: 'Amount must be positive',
    }),
});

export type UpdateBudgetParam = z.infer<typeof updateBudgetParamSchema>;
