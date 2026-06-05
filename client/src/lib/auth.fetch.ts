import * as s from 'standard-parse';

import type { FetchOptions, HttpMethods } from './fetch';
import { env } from '@/env';
import { useAuthStore } from '@/store/auth';
import { refreshAccessToken } from './tokens-manager';

import { buildQueryParams } from './fetch';

interface AuthenticatedFetchProps extends Omit<FetchOptions, 'body' | 'method'> {
  baseUrl?: string;
  url: string;
  responseStatus?: number;
  method: HttpMethods;
  // Allow FormData to be passed
  body?: object | FormData;
}

export const authenticatedFetch = async ({
  baseUrl = env.VITE_PUBLIC_SERVER_URL,
  url,
  headers,
  responseStatus = 401,
  body,
  method,
  ...props
}: AuthenticatedFetchProps) => {
  const accessToken = useAuthStore.getState().tokens?.accessToken;

  if (!accessToken) throw new Error('No authentication token provided');

  const isFormData = body instanceof FormData;

  const authHeaders: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    ...((headers as Record<string, string>) || {}),
  };

  // Only assign application/json if it's not FormData and a content-type wasn't explicitly provided
  if (!isFormData && !authHeaders['Content-Type']) {
    authHeaders['Content-Type'] = 'application/json';
  }

  const requestOptions = {
    method,
    // Send FormData directly, otherwise stringify
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
      // 1. Call the shared refresh logic
      await refreshAccessToken();

      // 2. Get new token
      const newAccessToken = useAuthStore.getState().tokens?.accessToken;

      // 3. Update headers
      authHeaders.Authorization = `Bearer ${newAccessToken}`;

      // 4. Retry request
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

  const json = await response.json();
  return json;
};

interface TypedAuthenticatedFetchProps<
  S extends s.StandardSchemaV1,
> extends AuthenticatedFetchProps {
  method: HttpMethods;
  schema: S;
  body?: object | FormData;
  query?: object; // Renamed from params to query
}

export const authenticatedTypedFetch = async <S extends s.StandardSchemaV1>({
  baseUrl = env.VITE_PUBLIC_SERVER_URL,
  url,
  headers,
  responseStatus = 401,
  body,
  schema,
  query,
  method,
  ...props
}: TypedAuthenticatedFetchProps<S>): Promise<s.StandardSchemaV1.InferOutput<S>> => {
  const accessToken = useAuthStore.getState().tokens?.accessToken;

  if (!accessToken) throw new Error('No authentication token provided');

  const isFormData = body instanceof FormData;

  const authHeaders: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    ...((headers as Record<string, string>) || {}),
  };

  // Assign application/json if it's not FormData and left unspecified
  if (!isFormData && !authHeaders['Content-Type']) {
    authHeaders['Content-Type'] = 'application/json';
  }

  const paramsValues = buildQueryParams(query);

  if (paramsValues) url = url + (url.includes('?') ? '&' : '?') + paramsValues;

  const requestOptions = {
    method,
    // Send FormData directly, otherwise stringify
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
      // 1. Call shared refresh logic
      await refreshAccessToken();

      // 2. Get new token
      const newAccessToken = useAuthStore.getState().tokens?.accessToken;

      // 3. Update headers
      authHeaders.Authorization = `Bearer ${newAccessToken}`;

      // 4. Retry request
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

  const json = await response.json();

  const result = s.safeParse(schema, json);

  if (result.issues) throw new Error(JSON.stringify(result.issues));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return result.value;
};
