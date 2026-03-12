export interface PropertyAddressRequest {
  houseNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface CreatePropertyRequest {
  name: string;
  description?: string;
  address: PropertyAddressRequest;
}
