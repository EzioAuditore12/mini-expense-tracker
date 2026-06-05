import { z } from 'zod';

import { budgetSchema } from '../budget.schema';

export const budgetSummaryParamSchema = budgetSchema.pick({ month: true, year: true });

export type BudgetSummaryParam = z.infer<typeof budgetSummaryParamSchema>;
