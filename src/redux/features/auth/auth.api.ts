import { baseApi } from '../../services/base-api';

export enum UserRole {
  PROPERTY_ADMIN = 'PROPERTY_ADMIN',
  TENANT = 'TENANT',
}

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
  }),
});

export const { useGoogleLoginMutation } = authApi;
