import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar, { type SidebarItem } from '@/components/dashboard/DashboardSidebar';
import TopNavbar from '@/components/dashboard/TopNavbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface DashboardShellProps {
  roleLabel: string;
  items: SidebarItem[];
  userName?: string;
  userInitials?: string;
  children?: ReactNode;
}

export default function DashboardShell({
  roleLabel,
  items,
  userName,
  userInitials,
  children,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar items={items} role={roleLabel} />
      <SidebarInset className="bg-white">
        <TopNavbar userName={userName} userInitials={userInitials} />
        <section className="flex-1 p-4 lg:p-6">
          <div className="min-h-full rounded-2xl border border-border/70 bg-white p-4 lg:p-6">
            {children ?? <Outlet />}
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
