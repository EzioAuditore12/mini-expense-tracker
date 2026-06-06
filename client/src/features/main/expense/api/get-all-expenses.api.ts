import { authenticatedTypedFetch } from '@/lib/auth-fetch';

import type { GetAllExpensesParam } from '../schemas/get-all/param.schema';
import { getAllExpensesResponseSchema } from '../schemas/get-all/response.schema';

export const getAllExpensesApi = async (query: GetAllExpensesParam) => {
  return await authenticatedTypedFetch({
    url: 'expense',
    method: 'GET',
    query,
    schema: getAllExpensesResponseSchema,
  });
};
