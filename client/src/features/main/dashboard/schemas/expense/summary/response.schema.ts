import { z } from 'zod';

import { expenseSchema } from '@/features/main/expense/schemas/expense.schema';
import { categoryEnumSchema } from '@/features/main/expense/schemas/enums/categrory-enum.schema';

export const getExpenseSummaryResponseSchema = z.object({
  totalExpenses: z.number(),
  totalTransactions: z.number(),
  mostUsedCategory: categoryEnumSchema.nullable(),
  highestExpense: expenseSchema.pick({ amount: true, category: true }).nullable(),
});

export type GetExpenseSummaryResponse = z.infer<typeof getExpenseSummaryResponseSchema>;
