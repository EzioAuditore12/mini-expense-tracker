import { z } from 'zod';

import { expenseSchema } from '@/features/main/expense/schemas/expense.schema';

export const expenseCategorySummarySchema = expenseSchema.pick({ category: true }).extend({
  total: z.number(),
});

export const getExpenseCategorySummaryResponseSchema = expenseCategorySummarySchema.array();

export type ExpenseCategorySummary = z.infer<typeof expenseCategorySummarySchema>;

export type GetExpenseCategorySummaryResponse = z.infer<
  typeof getExpenseCategorySummaryResponseSchema
>;
