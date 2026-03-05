export interface ApiResponse<T> {
  message: string;
  errorCode?: string;
  details?: unknown;
  context?: string;
  data: T;
}
