export type CreatePropertyResponse = null;

export interface PropertyApiAddress {
  houseNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PropertyApiEntity {
  _id: string;
  name: string;
  description?: string;
  contactNumber?: string;
  address: PropertyApiAddress;
  owner: string;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds?: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type GetPropertyResponse = PropertyApiEntity;

export type GetPropertiesResponse = PropertyApiEntity[];
