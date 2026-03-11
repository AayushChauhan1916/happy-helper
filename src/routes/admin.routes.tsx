import type { RouteObject } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/Admin/AdminDashbaord';
import RoleGuard from '@/guards/RoleGuard';
import { UserRole } from '@/types/common/roles';
import ComingSoonPage from '@/pages/common/ComingSoonPage';

export const adminRoutes: RouteObject = {
  path: 'admin',
  element: <RoleGuard allowedRoles={[UserRole.SUPER_ADMIN]} />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'users', element: <ComingSoonPage title="Users" /> },
        { path: 'settings', element: <ComingSoonPage title="Settings" /> },
      ],
    },
  ],
};
