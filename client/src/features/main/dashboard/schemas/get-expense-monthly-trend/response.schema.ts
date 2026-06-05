import { z } from 'zod';

export const expenseMonthlyTrendSchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().positive(),
  total: z.number(),
});

export const getExpenseMonthlyTrendResponseSchema = expenseMonthlyTrendSchema.array();

export type ExpenseMonthlyTrend = z.infer<typeof expenseMonthlyTrendSchema>;

export type GetExpenseMonthlyTrendResponse = z.infer<typeof getExpenseMonthlyTrendResponseSchema>;
