import { UserRole } from '@/types/common/roles';

const ROLE_DASHBOARD_MAP: Record<string, string> = {
  [UserRole.TENANT]: '/tenant',
  [UserRole.SUPER_ADMIN]: '/admin',
  [UserRole.PROPERTY_ADMIN]: '/owner',
};

export function getDashboardPathByRole(role?: string): string {
  if (!role) {
    return '/';
  }

  return ROLE_DASHBOARD_MAP[role.toUpperCase()] ?? '/';
}

export function hasAccessToken(): boolean {
  return Boolean(localStorage.getItem('accessToken'));
}
