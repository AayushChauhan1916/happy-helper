export interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  errorCode: string;
  context?: string;
  details?: unknown;
  timestamp: string;
  path?: string;
}
