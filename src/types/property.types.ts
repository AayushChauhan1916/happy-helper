export interface PropertyAddress {
  houseNumber: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Property {
  id: string;
  name: string;
  description?: string;
  contactNumber?: string;
  address: PropertyAddress;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
}

export type RoomType = 'single' | 'sharing';
export type FoodPlan = 'none' | '1_meal' | '2_meals' | '3_meals';

export const FOOD_PLAN_LABELS: Record<FoodPlan, string> = {
  none: 'No Food',
  '1_meal': '1 Meal',
  '2_meals': '2 Meals',
  '3_meals': '3 Meals',
};

export interface AmenityOption {
  id: string;
  label: string;
}

export const AMENITY_OPTIONS: AmenityOption[] = [
  { id: 'ac', label: 'AC' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'bathroom', label: 'Attached Bathroom' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'study_table', label: 'Study Table' },
  { id: 'balcony', label: 'Balcony' },
];

export interface Bed {
  id: string;
  label: string;
  rent: number;
  securityDeposit: number;
  foodPlan: FoodPlan;
  electricityIncluded: boolean;
  amenities: string[];
  occupied: boolean;
  tenantName?: string;
}

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  floorNumber: number;
  type: RoomType;
  /* Single-room pricing (ignored for sharing) */
  rent?: number;
  securityDeposit?: number;
  foodPlan?: FoodPlan;
  electricityIncluded?: boolean;
  amenities?: string[];
  beds: Bed[];
}
