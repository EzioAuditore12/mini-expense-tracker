import { z } from 'zod';

import { budgetSchema } from '@/db/tables/budget.table';

export const budgetStatusEnumSchema = z.enum([
  'ON_TRACK',
  'APPROACHING_LIMIT',
  'OVER_BUDGET',
]);

export const budgetStatusSchema = budgetSchema
  .pick({ id: true, category: true, limitAmount: true })
  .extend({
    spent: z.number(),
    remaining: z.number(),
    percentage: z.number(),
    status: budgetStatusEnumSchema,
  });

export const budgetStatusResponseSchema = budgetStatusSchema.array();

export type BudgetStatusEnum = z.infer<typeof budgetStatusEnumSchema>;

export type BudgetStatus = z.infer<typeof budgetStatusSchema>;

export type BudgetStatusResponse = z.infer<typeof budgetStatusResponseSchema>;
