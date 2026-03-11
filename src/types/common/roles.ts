export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  PROPERTY_ADMIN: 'PROPERTY_ADMIN',
  TENANT: 'TENANT',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
