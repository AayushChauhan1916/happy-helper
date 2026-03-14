export interface OnboardingAddressRequest {
  houseNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OnboardingPropertyRequest {
  name: string;
  contactNumber: string;
  description?: string;
  address: OnboardingAddressRequest;
}

export interface SubmitOwnerOnboardingRequest {
  fullName: string;
  phoneNumber?: string;
  property: OnboardingPropertyRequest;
}
