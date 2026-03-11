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
      <SidebarInset className="bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted)/0.45)_100%)]">
        <TopNavbar userName={userName} userInitials={userInitials} />
        <section className="flex-1 p-4 lg:p-6">
          <div className="min-h-full rounded-2xl border border-border/70 bg-white p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.3)] lg:p-6">
            {children ?? <Outlet />}
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
