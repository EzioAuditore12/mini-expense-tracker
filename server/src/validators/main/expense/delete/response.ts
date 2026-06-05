import { z } from 'zod';

export const expenseDeleteResponseSchema = z.object({
  message: z.string(),
});

export type ExpenseDeleteResponse = z.infer<typeof expenseDeleteResponseSchema>;
