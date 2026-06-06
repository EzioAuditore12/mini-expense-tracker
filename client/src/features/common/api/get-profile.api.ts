import { authenticatedTypedFetch } from '@/lib/auth-fetch';

import { userSchema } from '../schemas/user.schema';

export const getProfileApi = () => {
  return authenticatedTypedFetch({
    url: 'user/profile',
    method: 'GET',
    schema: userSchema,
  });
};
