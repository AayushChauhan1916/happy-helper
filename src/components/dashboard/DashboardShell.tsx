import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { CreateStayDialog } from "@/components/stay/CreateStayDialog";

export function DashboardShell() {
  const [createStayOpen, setCreateStayOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onCreateStay={() => setCreateStayOpen(true)} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center gap-4 border-b bg-background px-4">
            <SidebarTrigger />
            <h2 className="text-sm font-medium text-muted-foreground">PG Management</h2>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <CreateStayDialog open={createStayOpen} onOpenChange={setCreateStayOpen} />
    </SidebarProvider>
  );
}
