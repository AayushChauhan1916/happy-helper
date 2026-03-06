import type { ApiResponse } from '@/types/common/IApiResponse';
import type { RefreshTokenResponse } from '@/types/responses/auth/IRefereshTokenResponse';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/v1',
  credentials: 'include',

  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await rawBaseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      const refreshData =
        refreshResult.data as ApiResponse<RefreshTokenResponse>;
      const newAccessToken = refreshData.data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem('accessToken');
      window.location.href = '/login?reason=session-expired';
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
