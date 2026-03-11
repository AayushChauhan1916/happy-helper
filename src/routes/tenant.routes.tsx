import type { RouteObject } from 'react-router-dom';
import RoleGuard from '@/guards/RoleGuard';
import TenantLayout from '@/layouts/TenantLayout';
import TenantDashboard from '@/pages/tenant/TenantDashboard';
import { UserRole } from '@/types/common/roles';
import ComingSoonPage from '@/pages/common/ComingSoonPage';

export const tenantRoutes: RouteObject = {
  path: 'tenant',
  element: <RoleGuard allowedRoles={[UserRole.TENANT]} />,
  children: [
    {
      element: <TenantLayout />,
      children: [
        { index: true, element: <TenantDashboard /> },
        { path: 'dashboard', element: <TenantDashboard /> },
        { path: 'room', element: <ComingSoonPage title="My Room" /> },
        { path: 'payments', element: <ComingSoonPage title="Payments" /> },
      ],
    },
  ],
};
