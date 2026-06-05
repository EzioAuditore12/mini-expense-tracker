import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';
import { budgetParamSchema } from '../param';

export const budgetDeleteParamSchema = budgetParamSchema;

export type BudgetDeleteParams = z.infer<typeof budgetDeleteParamSchema>;

export type BudgetDeleteParamRequest = ValidatedRequest<{
  params: typeof budgetDeleteParamSchema;
}>;
