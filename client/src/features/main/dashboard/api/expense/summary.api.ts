import { authenticatedTypedFetch } from '@/lib/auth-fetch';
import { getExpenseSummaryResponseSchema } from '../../schemas/expense/summary/response.schema';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const getExpenseSummaryApi = async (query?: BudgetSummaryParam) => {
  return await authenticatedTypedFetch({
    url: 'expense/summary',
    method: 'GET',
    query,
    schema: getExpenseSummaryResponseSchema,
  });
};
