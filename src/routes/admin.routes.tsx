import type { RouteObject } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/Admin/AdminDashbaord';

export const adminRoutes: RouteObject = {
  element: <AdminLayout />,
  children: [{ path: '/admin/dashboard', element: <AdminDashboard /> }],
};
