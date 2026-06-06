import { authenticatedTypedFetch } from '@/lib/auth-fetch';

import type { CreateExpenseParam } from '../schemas/create/param.schema';
import { expenseSchema } from '../schemas/expense.schema';

export const createExpenseApi = async (data: CreateExpenseParam) => {
  return await authenticatedTypedFetch({
    url: 'expense',
    method: 'POST',
    body: data,
    schema: expenseSchema,
  });
};
