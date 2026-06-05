import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

import { expenseUpdateSchema } from '@/db/tables/expense.table';
import { expenseParamSchema } from '../param';

export const updateExpenseSchema = expenseUpdateSchema.pick({
  amount: true,
  expenseDate: true,
  note: true,
  category: true,
});

export type UpdateExpenseBody = z.infer<typeof updateExpenseSchema>;

export type UpdateExpenseRequest = ValidatedRequest<{
  params: typeof expenseParamSchema;
  body: typeof updateExpenseSchema;
}>;
