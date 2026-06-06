import { z } from 'zod';

import { authenticatedTypedFetch } from '@/lib/auth-fetch';

export const deleteBudgetApi = async (id: string) => {
  return await authenticatedTypedFetch({
    url: `budget/${id}`,
    method: 'DELETE',
    schema: z.object({ message: z.string() }),
  });
};
