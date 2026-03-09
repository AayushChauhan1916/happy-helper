export interface AuthTokenResponse {
  accessToken: string;
}

export interface VerifyOtpResponse {
  accessToken?: string;
}

export interface LoginResponse {
  email: string;
  role: string;
}

export interface SignUpResponse {
  userId: string;
  email: string;
  role: string;
  requiresVerification: boolean;
}
