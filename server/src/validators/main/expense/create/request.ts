import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { expenseInsertSchema } from '@/db/tables/expense.table';

export const createExpenseSchema = expenseInsertSchema.pick({
  expenseDate: true,
  amount: true,
  category: true,
  note: true,
});

export type CreateExpenseBody = z.infer<typeof createExpenseSchema>;

export type CreateExpenseRequest = ValidatedRequest<{
  body: typeof createExpenseSchema;
}>;
