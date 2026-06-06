import { authenticatedTypedFetch } from '@/lib/auth-fetch';
import { getExpenseMonthlyTrendResponseSchema } from '../../schemas/expense/monthly-trend/response.schema';
import type { BudgetSummaryParam } from '../../schemas/budget/summary/param.schema';

export const getExpenseMonthlyTrendApi = async (query?: Partial<BudgetSummaryParam>) => {
  return await authenticatedTypedFetch({
    url: 'expense/monthly-trend',
    method: 'GET',
    query,
    schema: getExpenseMonthlyTrendResponseSchema,
  });
};
