import { z } from 'zod';

import { expenseSchema } from '@/db/tables/expense.table';

export const updateExpenseResponseSchema = expenseSchema;

export type UpdateExpenseResponseBody = z.infer<
  typeof updateExpenseResponseSchema
>;
