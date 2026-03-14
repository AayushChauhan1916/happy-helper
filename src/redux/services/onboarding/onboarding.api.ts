import { baseApi } from '@/redux/services/base-api';
import type { ApiResponse } from '@/types/common/IApiResponse';
import type { SubmitOwnerOnboardingRequest } from '@/types/requests/onboarding/onboarding.requests';
import type { SubmitOwnerOnboardingResponse } from '@/types/responses/onboarding/onboarding.responses';

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitOwnerOnboarding: builder.mutation<
      ApiResponse<SubmitOwnerOnboardingResponse>,
      SubmitOwnerOnboardingRequest
    >({
      query: (body) => ({
        url: '/v1/user/onboarding',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubmitOwnerOnboardingMutation } = onboardingApi;
