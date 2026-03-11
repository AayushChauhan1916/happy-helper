import type { RouteObject } from 'react-router-dom';
import RoleGuard from '@/guards/RoleGuard';
import TenantLayout from '@/layouts/TenantLayout';
import TenantDashboard from '@/pages/tenant/TenantDashboard';
import { UserRole } from '@/types/common/roles';

export const tenantRoutes: RouteObject = {
  path: 'tenant',
  element: <RoleGuard allowedRoles={[UserRole.TENANT]} />,
  children: [
    {
      element: <TenantLayout />,
      children: [{ path: 'dashboard', element: <TenantDashboard /> }],
    },
  ],
};
