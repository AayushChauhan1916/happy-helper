import { baseApi } from '@/redux/services/base-api';
import type { ApiResponse } from '@/types/common/IApiResponse';
import type { CreatePropertyRequest } from '@/types/requests/property/property.requests';
import type { CreatePropertyResponse } from '@/types/responses/property/property.responses';

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation<
      ApiResponse<CreatePropertyResponse>,
      CreatePropertyRequest
    >({
      query: (body) => ({
        url: '/v1/properties',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreatePropertyMutation } = propertyApi;
