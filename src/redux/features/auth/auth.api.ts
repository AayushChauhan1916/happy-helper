import { baseApi } from '../../services/base-api';
import type { ApiResponse } from '@/types/common/IApiResponse';
import type {
  GoogleLoginRequest,
  LoginRequest,
  SignUpRequest,
  VerifyOtpRequest,
} from '@/types/requests/auth/auth.requests';
import type {
  AuthTokenResponse,
  LoginResponse,
  SignUpResponse,
  VerifyOtpResponse,
} from '@/types/responses/auth/auth.responses';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation<
      ApiResponse<AuthTokenResponse>,
      GoogleLoginRequest
    >({
      query: (body) => ({
        url: '/v1/auth/google',
        method: 'POST',
        body,
      }),
    }),
    dummyAuthCheck: builder.query<ApiResponse<unknown>, void>({
      query: () => ({
        url: '/v1/auth/dummy',
        method: 'GET',
      }),
    }),
    signUp: builder.mutation<ApiResponse<SignUpResponse>, SignUpRequest>({
      query: (body) => ({
        url: '/v1/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: ({ email, password }) => ({
        url: '/v1/auth/login',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      }),
    }),
    verifyOtp: builder.mutation<ApiResponse<VerifyOtpResponse>, VerifyOtpRequest>(
      {
      query: (body) => ({
        url: '/v1/auth/verify-otp',
        method: 'POST',
        body,
      }),
      },
    ),
  }),
});

export const {
  useGoogleLoginMutation,
  useDummyAuthCheckQuery,
  useSignUpMutation,
  useLoginMutation,
  useVerifyOtpMutation,
} = authApi;
