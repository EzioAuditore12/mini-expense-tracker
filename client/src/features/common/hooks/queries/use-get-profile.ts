import { useQuery } from '@tanstack/react-query';

import { getProfileApi } from '../../api/get-profile.api';

export const GET_PROFILE_QUERY_KEY = 'profile';

export function useGetProfile() {
  return useQuery({
    queryKey: [GET_PROFILE_QUERY_KEY],
    queryFn: getProfileApi,
  });
}
