import { baseApi } from '@/redux/services/base-api';
import type { ApiResponse } from '@/types/common/IApiResponse';
import type { CreatePropertyRequest } from '@/types/requests/property/property.requests';
import type {
  CreatePropertyResponse,
  GetPropertiesResponse,
  GetPropertyResponse,
} from '@/types/responses/property/property.responses';

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<ApiResponse<GetPropertiesResponse>, void>({
      query: () => ({
        url: '/v1/properties',
        method: 'GET',
      }),
    }),
    getMyProperties: builder.query<ApiResponse<GetPropertiesResponse>, void>({
      query: () => ({
        url: '/v1/properties/me',
        method: 'GET',
      }),
    }),
    getPropertyById: builder.query<ApiResponse<GetPropertyResponse>, string>({
      query: (propertyId) => ({
        url: `/v1/properties/${propertyId}`,
        method: 'GET',
      }),
    }),
    createProperty: builder.mutation<
      ApiResponse<CreatePropertyResponse>,
      CreatePropertyRequest
    >({
      query: (body) => ({
        url: '/v1/properties',
        method: 'POST',
        body,
      }),
      // invalidatesTags: [REDUX_TAGS.PROPERTY],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useGetMyPropertiesQuery,
  useGetPropertyByIdQuery,
} = propertyApi;
