import { z } from 'zod';
import type { ValidatedRequest } from 'express-zod-safe';
import { expenseParamSchema } from '../param';

export const expenseDeleteParamSchema = expenseParamSchema;

export type ExpenseDeleteParams = z.infer<typeof expenseDeleteParamSchema>;

export type ExpenseDeleteParamRequest = ValidatedRequest<{
  params: typeof expenseDeleteParamSchema;
}>;
