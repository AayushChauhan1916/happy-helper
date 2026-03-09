import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { ErrorResponse } from '@/types/common/IErrorResponse';

const isErrorResponse = (value: unknown): value is ErrorResponse => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<ErrorResponse>;
  return (
    typeof candidate.statusCode === 'number' &&
    typeof candidate.errorCode === 'string' &&
    (typeof candidate.message === 'string' || Array.isArray(candidate.message))
  );
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
) => {
  const fetchError = error as FetchBaseQueryError & { data?: unknown };

  if (isErrorResponse(fetchError?.data)) {
    if (Array.isArray(fetchError.data.message)) {
      return fetchError.data.message.join(', ');
    }

    return fetchError.data.message;
  }

  return fallback;
};
