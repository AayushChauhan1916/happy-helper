import { Home, LayoutDashboard, ReceiptText } from 'lucide-react';
import DashboardShell from '@/components/dashboard/DashboardShell';

export default function TenantLayout() {
  const items = [
    { title: 'Dashboard', url: '/tenant/dashboard', icon: LayoutDashboard },
    { title: 'My Room', url: '/tenant/room', icon: Home },
    { title: 'Payments', url: '/tenant/payments', icon: ReceiptText },
  ];

  return (
    <DashboardShell
      roleLabel="Tenant"
      items={items}
      userName="Tenant"
      userInitials="TN"
    />
  );
}
