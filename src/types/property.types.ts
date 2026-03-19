export type RoomType = "single" | "shared";
export type FoodPlan = "with_food" | "without_food";
export type StayStatus = "active" | "ended" | "upcoming";
export type Gender = "male" | "female" | "other";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  ownerId: string;
  createdAt: string;
}

export interface Room {
  id: string;
  propertyId: string;
  name: string;
  floor: number;
  roomType: RoomType;
  capacity: number;
  rent: number;
  foodPlan: FoodPlan;
}

export interface Bed {
  id: string;
  roomId: string;
  propertyId: string;
  label: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
}

export interface Stay {
  id: string;
  userId: string;
  bedId: string | null;
  roomId: string;
  propertyId: string;
  startDate: string;
  endDate: string | null;
  status: StayStatus;
  notes: string;
  createdAt: string;
}
