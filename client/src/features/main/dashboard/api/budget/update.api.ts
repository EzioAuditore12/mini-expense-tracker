import { authenticatedTypedFetch } from '@/lib/auth-fetch';
import type { UpdateBudgetParam } from '../../schemas/budget/update/param.schema';
import { updateBudgetResponseSchema } from '../../schemas/budget/update/response.schema';

export const updateBudgetApi = async (id: string, data: UpdateBudgetParam) => {
  return await authenticatedTypedFetch({
    url: `budget/${id}`,
    method: 'PATCH',
    body: {
      limitAmount: Number(data.limitAmount),
    },
    schema: updateBudgetResponseSchema,
  });
};
