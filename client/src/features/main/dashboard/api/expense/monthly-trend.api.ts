import { authenticatedTypedFetch } from '@/lib/auth-fetch';
import { getExpenseMonthlyTrendResponseSchema } from '../../schemas/expense/monthly-trend/response.schema';

export const getExpenseMonthlyTrendApi = async () => {
  return await authenticatedTypedFetch({
    url: 'expense/monthly-trend',
    method: 'GET',
    schema: getExpenseMonthlyTrendResponseSchema,
  });
};
