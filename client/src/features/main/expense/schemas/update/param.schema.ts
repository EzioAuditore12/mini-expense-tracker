import { z } from 'zod';
import { endOfToday } from 'date-fns';
import { isNumeric } from 'validator';

import { expenseSchema } from '../expense.schema';

export const updateExpenseParamSchema = expenseSchema
  .pick({
    amount: true,
    category: true,
    expenseDate: true,
    note: true,
  })
  .extend({
    expenseDate: z.date().max(endOfToday(), 'Expense date cannot be in the future'),
    amount: z
      .string()
      .refine((val) => isNumeric(val), { error: 'Amount must be numeric' })
      .refine((val) => Number(val) > 0, {
        message: 'Amount must be positive',
      }),
  })
  .partial();

export type UpdateExpenseParam = z.infer<typeof updateExpenseParamSchema>;
