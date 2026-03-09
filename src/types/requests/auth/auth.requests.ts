import type { UserRole } from '@/types/common/roles';

export enum OtpPurpose {
  SIGNUP_VERIFICATION = 'signup_verification',
  LOGIN_VERIFICATION = 'login_verifcation',
  RESET_PASSWORD = 'reset_password',
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  otp: string;
  email: string;
  purpose: OtpPurpose;
}

export interface GoogleLoginRequest {
  code: string;
  role: UserRole;
  propertyId?: string;
}

export interface SignUpRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
}
