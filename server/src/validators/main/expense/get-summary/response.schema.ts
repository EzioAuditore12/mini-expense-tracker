import { z } from 'zod';

import { categoryEnumSchema } from '@/db/tables/enums/category.enum';

export const highestExpenseSchema = z
  .object({
    amount: z.number(),
    category: categoryEnumSchema,
  })
  .nullable();

export const getExpenseSummaryResponseSchema = z.object({
  totalExpenses: z.number(),
  totalTransactions: z.number(),
  mostUsedCategory: categoryEnumSchema.nullable(),
  highestExpense: highestExpenseSchema,
});

export type HighestExpense = z.infer<typeof highestExpenseSchema>;

export type GetExpenseSummaryResponse = z.infer<
  typeof getExpenseSummaryResponseSchema
>;
