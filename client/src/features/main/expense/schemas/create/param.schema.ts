import { z } from 'zod';

import { expenseSchema } from '../expense.schema';

export const createExpenseParamSchema = expenseSchema.pick({
  amount: true,
  category: true,
  expenseDate: true,
  note: true,
});

export type CreateExpenseParam = z.infer<typeof createExpenseParamSchema>;
