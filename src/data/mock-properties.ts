import { Property, Room, Bed, User, Stay } from "@/types/property.types";

export const mockProperties: Property[] = [
  { id: "p1", name: "Sunrise PG", address: "12 MG Road", city: "Bangalore", ownerId: "owner1", createdAt: "2024-01-01" },
  { id: "p2", name: "Greenview Hostel", address: "45 Koramangala", city: "Bangalore", ownerId: "owner1", createdAt: "2024-02-15" },
];

export const mockRooms: Room[] = [
  { id: "r1", propertyId: "p1", name: "Room 101", floor: 1, roomType: "single", capacity: 1, rent: 8000, foodPlan: "with_food" },
  { id: "r2", propertyId: "p1", name: "Room 102", floor: 1, roomType: "shared", capacity: 3, rent: 5000, foodPlan: "with_food" },
  { id: "r3", propertyId: "p1", name: "Room 201", floor: 2, roomType: "shared", capacity: 2, rent: 5500, foodPlan: "without_food" },
  { id: "r4", propertyId: "p2", name: "Room A1", floor: 1, roomType: "single", capacity: 1, rent: 7000, foodPlan: "without_food" },
  { id: "r5", propertyId: "p2", name: "Room A2", floor: 1, roomType: "shared", capacity: 4, rent: 4500, foodPlan: "with_food" },
];

export const mockBeds: Bed[] = [
  // Room 102 (shared, 3 beds)
  { id: "b1", roomId: "r2", propertyId: "p1", label: "Bed A" },
  { id: "b2", roomId: "r2", propertyId: "p1", label: "Bed B" },
  { id: "b3", roomId: "r2", propertyId: "p1", label: "Bed C" },
  // Room 201 (shared, 2 beds)
  { id: "b4", roomId: "r3", propertyId: "p1", label: "Bed A" },
  { id: "b5", roomId: "r3", propertyId: "p1", label: "Bed B" },
  // Room A2 (shared, 4 beds)
  { id: "b6", roomId: "r5", propertyId: "p2", label: "Bed 1" },
  { id: "b7", roomId: "r5", propertyId: "p2", label: "Bed 2" },
  { id: "b8", roomId: "r5", propertyId: "p2", label: "Bed 3" },
  { id: "b9", roomId: "r5", propertyId: "p2", label: "Bed 4" },
];

export const mockUsers: User[] = [
  { id: "u1", fullName: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", gender: "male" },
  { id: "u2", fullName: "Priya Patel", email: "priya@example.com", phone: "9876543211", gender: "female" },
  { id: "u3", fullName: "Amit Kumar", email: "amit@example.com", phone: "9876543212", gender: "male" },
  { id: "u4", fullName: "Sneha Reddy", email: "sneha@example.com", phone: "9876543213", gender: "female" },
];

export const mockStays: Stay[] = [
  // Room 101 (single) - occupied
  { id: "s1", userId: "u1", bedId: null, roomId: "r1", propertyId: "p1", startDate: "2024-06-01", endDate: null, status: "active", notes: "Long term tenant", createdAt: "2024-06-01" },
  // Room 102 - Bed A occupied, Bed B occupied with endDate (vacating soon), Bed C vacant
  { id: "s2", userId: "u2", bedId: "b1", roomId: "r2", propertyId: "p1", startDate: "2024-07-01", endDate: null, status: "active", notes: "", createdAt: "2024-07-01" },
  { id: "s3", userId: "u3", bedId: "b2", roomId: "r2", propertyId: "p1", startDate: "2024-08-01", endDate: "2026-03-25", status: "active", notes: "Leaving end of month", createdAt: "2024-08-01" },
  // Room A1 (single) - vacant (no stay)
  // Room A2 - Bed 1 occupied, rest vacant
  { id: "s4", userId: "u4", bedId: "b6", roomId: "r5", propertyId: "p2", startDate: "2024-09-01", endDate: null, status: "active", notes: "Student", createdAt: "2024-09-01" },
];

// Helper functions
export function getPropertyRooms(propertyId: string) {
  return mockRooms.filter((r) => r.propertyId === propertyId);
}

export function getRoomBeds(roomId: string) {
  return mockBeds.filter((b) => b.roomId === roomId);
}

export function getBedStay(bedId: string) {
  return mockStays.find((s) => s.bedId === bedId && s.status === "active");
}

export function getRoomStay(roomId: string) {
  return mockStays.find((s) => s.roomId === roomId && s.bedId === null && s.status === "active");
}

export function getUserById(userId: string) {
  return mockUsers.find((u) => u.id === userId);
}

export function getUserByEmail(email: string) {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getPropertyOccupancy(propertyId: string) {
  const rooms = getPropertyRooms(propertyId);
  let totalBeds = 0;
  let occupiedBeds = 0;

  rooms.forEach((room) => {
    if (room.roomType === "single") {
      totalBeds += 1;
      if (getRoomStay(room.id)) occupiedBeds += 1;
    } else {
      const beds = getRoomBeds(room.id);
      totalBeds += beds.length;
      beds.forEach((bed) => {
        if (getBedStay(bed.id)) occupiedBeds += 1;
      });
    }
  });

  return { totalBeds, occupiedBeds, vacantBeds: totalBeds - occupiedBeds };
}

export function getRoomOccupancy(roomId: string) {
  const room = mockRooms.find((r) => r.id === roomId);
  if (!room) return { total: 0, occupied: 0, vacant: 0 };

  if (room.roomType === "single") {
    const stay = getRoomStay(roomId);
    return { total: 1, occupied: stay ? 1 : 0, vacant: stay ? 0 : 1 };
  }

  const beds = getRoomBeds(roomId);
  let occupied = 0;
  beds.forEach((bed) => {
    if (getBedStay(bed.id)) occupied += 1;
  });
  return { total: beds.length, occupied, vacant: beds.length - occupied };
}

export function isVacatingSoon(endDate: string | null): boolean {
  if (!endDate) return false;
  const end = new Date(endDate);
  const now = new Date();
  const diffDays = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}
