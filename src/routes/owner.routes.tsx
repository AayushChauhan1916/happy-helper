import type { RouteObject } from 'react-router-dom';
import OwnerLayout from '@/layouts/OwnerLayout';
import RoleGuard from '@/guards/RoleGuard';
import OwnerDashboard from '@/pages/owner/OwnerDashboard';

export const ownerRoutes: RouteObject = {
  path: 'owner',
  element: <RoleGuard allowedRoles={['owner']} />,
  children: [
    {
      element: <OwnerLayout />,
      children: [{ path: 'dashboard', element: <OwnerDashboard /> }],
    },
  ],
};
