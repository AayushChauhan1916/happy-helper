import { baseApi } from '../../services/base-api';
import type { ApiResponse } from '@/types/common/IApiResponse';

export const UserRole = {
  PROPERTY_ADMIN: 'PROPERTY_ADMIN',
  TENANT: 'TENANT',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

interface GoogleLoginRequest {
  code: string;
  role: UserRole;
  propertyId?: string;
}

interface AuthResponse {
  data: {
    accessToken: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation<AuthResponse, GoogleLoginRequest>({
      query: (body) => ({
        url: '/auth/google',
        method: 'POST',
        body,
      }),
    }),
    dummyAuthCheck: builder.query<ApiResponse<unknown>, void>({
      query: () => ({
        url: '/auth/dummy',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGoogleLoginMutation, useDummyAuthCheckQuery } = authApi;
