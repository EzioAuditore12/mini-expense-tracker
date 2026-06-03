import { typedFetch } from '@/lib/fetch';

import { env } from '@/env';
import { tokensSchema } from '@/features/common/schemas/token.schema';

export const refreshTokensApi = async (data: { refreshToken: string }) => {
  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/refresh`,
    method: 'POST',
    body: data,
    schema: tokensSchema,
  });
};
