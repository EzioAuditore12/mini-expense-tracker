import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';

export const expenseParamSchema = z.object({
  id: z.base64(),
});

export type ExpenseParams = z.infer<typeof expenseParamSchema>;

export type ExpenseParamRequest = ValidatedRequest<{
  params: typeof expenseParamSchema;
}>;
