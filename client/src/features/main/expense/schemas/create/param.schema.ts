import { z } from 'zod';
import { isNumeric } from 'validator';

import { expenseSchema } from '../expense.schema';

export const createExpenseParamSchema = expenseSchema
  .pick({
    amount: true,
    category: true,
    expenseDate: true,
    note: true,
  })
  .extend({
    expenseDate: z.date(),
    amount: z.string().refine((val) => isNumeric(val), { error: 'Amount must be numeric' }),
  });

export type CreateExpenseParam = z.infer<typeof createExpenseParamSchema>;
