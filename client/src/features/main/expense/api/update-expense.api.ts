import { authenticatedTypedFetch } from '@/lib/auth-fetch';

import { expenseSchema } from '../schemas/expense.schema';
import type { UpdateExpenseParam } from '../schemas/update/param.schema';

export const updateExpenseApi = async (id: string, data: UpdateExpenseParam) => {
  return await authenticatedTypedFetch({
    url: `expense/${id}`,
    method: 'PATCH',
    body: data,
    schema: expenseSchema,
  });
};
