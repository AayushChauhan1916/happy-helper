import type { RouteObject } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/Admin/AdminDashbaord';
import RoleGuard from '@/guards/RoleGuard';
import { UserRole } from '@/types/common/roles';

export const adminRoutes: RouteObject = {
  path: 'admin',
  element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]} />,
  children: [
    {
      element: <AdminLayout />,
      children: [{ path: 'dashboard', element: <AdminDashboard /> }],
    },
  ],
};
