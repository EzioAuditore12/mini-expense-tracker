import { z } from 'zod';

import { expenseSchema } from '@/db/tables/expense.table';

export const createExpenseResponseSchema = expenseSchema;

export type CreateExpenseResponseBody = z.infer<
  typeof createExpenseResponseSchema
>;
