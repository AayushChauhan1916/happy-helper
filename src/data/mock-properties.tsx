import type { Property, Room } from '@/types/property.types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    name: 'Sunrise PG',
    description: 'Premium PG near IT park with modern amenities',
    contactNumber: '+919876543210',
    address: {
      houseNumber: '12A',
      street: 'MG Road',
      landmark: 'Near City Mall',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
    },
    totalRooms: 3,
    totalBeds: 5,
    occupiedBeds: 2,
  },
  {
    id: 'p2',
    name: 'Green Valley Stay',
    description: 'Affordable PG for students near university',
    contactNumber: '+919123456789',
    address: {
      houseNumber: '45B',
      street: 'College Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      country: 'India',
    },
    totalRooms: 5,
    totalBeds: 12,
    occupiedBeds: 9,
  },
  {
    id: 'p3',
    name: 'Metro Nest PG',
    description: 'Working professionals PG with food included',
    contactNumber: '+919988776655',
    address: {
      houseNumber: '7',
      street: 'Sector 18',
      landmark: 'Opposite Metro Station',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      country: 'India',
    },
    totalRooms: 8,
    totalBeds: 20,
    occupiedBeds: 15,
  },
];

export const MOCK_ROOMS: Room[] = [
  {
    id: 'r1',
    propertyId: 'p1',
    roomNumber: '101',
    floorNumber: 1,
    type: 'single',
    rent: 8000,
    securityDeposit: 8000,
    foodPlan: 'none',
    electricityIncluded: false,
    amenities: ['ac', 'wifi'],
    beds: [],
  },
  {
    id: 'r2',
    propertyId: 'p1',
    roomNumber: '102',
    floorNumber: 1,
    type: 'sharing',
    beds: [
      {
        id: 'b1',
        label: 'A',
        rent: 6000,
        securityDeposit: 6000,
        foodPlan: '2_meals',
        electricityIncluded: true,
        amenities: ['ac', 'wifi'],
        occupied: false,
      },
      {
        id: 'b2',
        label: 'B',
        rent: 6000,
        securityDeposit: 6000,
        foodPlan: '2_meals',
        electricityIncluded: true,
        amenities: ['ac', 'wifi'],
        occupied: true,
        tenantName: 'Rohan Mehta',
      },
      {
        id: 'b3',
        label: 'C',
        rent: 5500,
        securityDeposit: 5500,
        foodPlan: 'none',
        electricityIncluded: false,
        amenities: ['wifi'],
        occupied: false,
      },
    ],
  },
  {
    id: 'r3',
    propertyId: 'p1',
    roomNumber: '201',
    floorNumber: 2,
    type: 'single',
    rent: 9500,
    securityDeposit: 9500,
    foodPlan: '2_meals',
    electricityIncluded: true,
    amenities: ['ac', 'wifi', 'bathroom', 'wardrobe'],
    beds: [],
  },
];

/* ── helpers ── */
let _counter = 1000;
export const generateId = () => `gen_${++_counter}`;
export const nextBedLabel = (beds: { label: string }[]) =>
  String.fromCharCode(65 + beds.length);
export const formatRupee = (v: number) => `₹${v.toLocaleString('en-IN')}`;
