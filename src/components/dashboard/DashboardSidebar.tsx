import { type LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { APP_COPYRIGHT_YEAR, APP_NAME } from '@/constants/app';
import { Link } from 'react-router-dom';
import { NavLink } from '../navbar/Navlinks';

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  role: string;
}

const DashboardSidebar = ({ items, role }: DashboardSidebarProps) => {
  const { state, isMobile } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 pt-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block truncate text-base font-bold tracking-tight text-sidebar-foreground">
                {APP_NAME}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-sidebar-foreground/55">
                {role}
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/45">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    size={isMobile ? 'lg' : 'default'}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end
                      className="rounded-xl hover:bg-sidebar-accent/80"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <p className="text-[10px] text-sidebar-foreground/45">
            (c) {APP_COPYRIGHT_YEAR} {APP_NAME}
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;


