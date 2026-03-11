import { LayoutDashboard, Users, Settings } from 'lucide-react';
import DashboardShell from '@/components/dashboard/DashboardShell';

export default function AdminLayout() {
  const items = [
    { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'Users', url: '/admin/users', icon: Users },
    { title: 'Settings', url: '/admin/settings', icon: Settings },
  ];

  return (
    <DashboardShell
      roleLabel="Super Admin"
      items={items}
      userName="Super Admin"
      userInitials="SA"
    />
  );
}
