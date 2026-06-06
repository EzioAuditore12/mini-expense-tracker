import { z } from 'zod';

import { authenticatedTypedFetch } from '@/lib/auth-fetch';

export const deleteExpenseApi = async (id: string) => {
  return await authenticatedTypedFetch({
    url: `expense/${id}`,
    method: 'DELETE',
    schema: z.object({ message: z.string() }),
  });
};
