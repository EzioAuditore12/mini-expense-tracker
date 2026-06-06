import { authenticatedTypedFetch } from '@/lib/auth-fetch';
import { getExpenseSummaryResponseSchema } from '../../schemas/expense/summary/response.schema';

export const getExpenseSummaryApi = async () => {
  return await authenticatedTypedFetch({
    url: 'expense/summary',
    method: 'GET',
    schema: getExpenseSummaryResponseSchema,
  });
};
