import { authenticatedTypedFetch } from '@/lib/auth-fetch';

import type { CreateBudgetParam } from '../../schemas/budget/create/param.schema';
import { createBudgetResponseSchema } from '../../schemas/budget/create/response.schema';

export const createBudgetApi = async (data: CreateBudgetParam) => {
  return await authenticatedTypedFetch({
    url: 'budget',
    method: 'POST',
    body: data,
    schema: createBudgetResponseSchema,
  });
};
