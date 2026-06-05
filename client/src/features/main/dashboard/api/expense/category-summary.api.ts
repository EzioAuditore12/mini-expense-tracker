import { authenticatedTypedFetch } from '@/lib/auth.fetch';

import { getExpenseCategorySummaryResponseSchema } from '../../schemas/expense/category-summary/response.schema';

export const getExpenseCategorySummaryApi = async () => {
  return await authenticatedTypedFetch({
    url: 'expense/category-summary',
    method: 'GET',
    schema: getExpenseCategorySummaryResponseSchema,
  });
};
