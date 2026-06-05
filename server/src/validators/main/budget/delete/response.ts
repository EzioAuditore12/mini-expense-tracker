import { z } from 'zod';

export const budgetDeleteResponseSchema = z.object({
  message: z.string(),
});

export type BudgetDeleteResponse = z.infer<typeof budgetDeleteResponseSchema>;
