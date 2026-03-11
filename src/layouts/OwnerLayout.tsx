import { Building2, LayoutDashboard, Users } from 'lucide-react';
import DashboardShell from '@/components/dashboard/DashboardShell';


export default function OwnerLayout() {
  const items = [
    { title: 'Dashboard', url: '/owner/dashboard', icon: LayoutDashboard },
    { title: 'Properties', url: '/owner/properties', icon: Building2 },
    { title: 'Tenants', url: '/owner/tenants', icon: Users },
  ];

  return (
    <DashboardShell
      roleLabel="PG Admin"
      items={items}
      userName="PG Admin"
      userInitials="PG"
    />
  );
}
