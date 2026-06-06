import { authenticatedTypedFetch } from '@/lib/auth-fetch';

import { getExpenseCategorySummaryResponseSchema } from '../../schemas/expense/category-summary/response.schema';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const getExpenseCategorySummaryApi = async (query?: BudgetSummaryParam) => {
  return await authenticatedTypedFetch({
    url: 'expense/category-summary',
    method: 'GET',
    query,
    schema: getExpenseCategorySummaryResponseSchema,
  });
};
