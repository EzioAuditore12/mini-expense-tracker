import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

export const budgetParamSchema = z.object({
  id: z.base64(),
});

export type BudgetParams = z.infer<typeof budgetParamSchema>;

export type BudgetParamRequest = ValidatedRequest<{
  params: typeof budgetParamSchema;
}>;
