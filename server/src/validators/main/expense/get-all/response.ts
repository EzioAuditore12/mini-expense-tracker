import { z } from 'zod';

import { expenseSchema } from '@/db/tables/expense.table';

export const getAllExpensesResponseSchema = expenseSchema.array();

export type GetAllExpensesResponse = z.infer<
  typeof getAllExpensesResponseSchema
>;
