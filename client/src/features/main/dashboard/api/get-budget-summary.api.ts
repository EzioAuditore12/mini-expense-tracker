import { authenticatedTypedFetch } from '@/lib/auth.fetch';

import { budgetSummaryResponseSchema } from '../schemas/budget-summary/response.schema';
import type { BudgetSummaryParam } from '../schemas/budget-summary/param.schema';

export const budgetSummaryApi = async (query: BudgetSummaryParam) => {
  return await authenticatedTypedFetch({
    url: 'budget/summary',
    method: 'GET',
    query,
    schema: budgetSummaryResponseSchema,
  });
};
