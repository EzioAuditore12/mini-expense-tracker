import { z } from 'zod';

import { budgetSchema } from '../budget.schema';

export const budgetStatusSchema = z.enum(['ON_TRACK', 'APPROACHING_LIMIT', 'OVER_BUDGET']);

const budgetSummarySchema = budgetSchema
  .pick({
    category: true,
    limitAmount: true,
  })
  .extend({
    spent: z.number(),
    remaining: z.number(),
    percentage: z.number(),
    status: budgetStatusSchema,
  });

export const budgetSummaryResponseSchema = budgetSummarySchema.array();

export type BudgetStatus = z.infer<typeof budgetStatusSchema>;
export type BudgetSummary = z.infer<typeof budgetSummarySchema>;
export type BudgetSummaryResponse = z.infer<typeof budgetSummaryResponseSchema>;
