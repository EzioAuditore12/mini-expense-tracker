import { typedFetch } from '@/lib/fetch';

import { env } from '@/env';

import type { RegisterParams } from '../schemas/param.schema';
import { registerResponseSchema } from '../schemas/response.schema';

export const registerApi = async (data: RegisterParams) => {
  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/register`,
    method: 'POST',
    body: data,
    schema: registerResponseSchema,
  });
};
