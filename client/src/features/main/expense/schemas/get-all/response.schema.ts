import { z } from 'zod';

import { expenseSchema } from '../expense.schema';

export const getAllExpensesResponseSchema = z.object({
  data: expenseSchema.array(),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type GetAllExpensesResponse = z.infer<typeof getAllExpensesResponseSchema>;
