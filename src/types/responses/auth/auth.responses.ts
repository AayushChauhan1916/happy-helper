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

export interface MeResponse {
  _id: string;
  fullName: string;
  email: string;
  password: string | null;
  authProvider: string;
  phoneNumber: string;
  role: string;
  propertyId: string | null;
  ownedProperties: string[];
  isOwnerOnboardingCompleted: boolean;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  picture: string;
  googleProviderId: string | null;
}
