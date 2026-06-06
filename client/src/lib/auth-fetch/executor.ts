import { env } from '@/env';
import type { BaseAuthenticatedFetchProps } from './type';
import { useAuthStore } from '@/store/auth';
import { buildQueryParams } from '../fetch';
import { refreshAccessToken } from './tokens-manager';

export const executeAuthenticatedRequest = async ({
  baseUrl = env.VITE_PUBLIC_SERVER_URL,
  url,
  headers,
  responseStatus = 401,
  body,
  query,
  method,
  ...props
}: BaseAuthenticatedFetchProps) => {
  const accessToken = useAuthStore.getState().tokens?.accessToken;

  if (!accessToken) {
    throw new Error('No authentication token provided');
  }

  const isFormData = body instanceof FormData;

  const authHeaders: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,

    ...((headers as Record<string, string>) || {}),
  };

  if (!isFormData && !authHeaders['Content-Type']) {
    authHeaders['Content-Type'] = 'application/json';
  }

  const paramsValues = buildQueryParams(query);

  if (paramsValues) {
    url = url + (url.includes('?') ? '&' : '?') + paramsValues;
  }

  const requestOptions = {
    method,

    body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
  };

  const apiUrl = `${baseUrl}/${url}`;

  let response = await fetch(apiUrl, {
    ...requestOptions,

    headers: authHeaders,

    ...props,
  });

  if (response.status === responseStatus) {
    try {
      await refreshAccessToken();

      const newAccessToken = useAuthStore.getState().tokens?.accessToken;

      authHeaders.Authorization = `Bearer ${newAccessToken}`;

      response = await fetch(apiUrl, {
        ...requestOptions,

        headers: authHeaders,

        ...props,
      });
    } catch (error) {
      alert('Session expired. Please login again.');

      throw error;
    }
  }

  return response;
};
