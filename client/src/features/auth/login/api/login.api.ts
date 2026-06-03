import { typedFetch } from '@/lib/fetch';

import { env } from '@/env';

import type { LoginParams } from '../schemas/param.schema';
import { loginResponseSchema } from '../schemas/response.schema';

export const loginApi = async (data: LoginParams) => {
  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/login`,
    method: 'POST',
    body: data,
    schema: loginResponseSchema,
  });
};
