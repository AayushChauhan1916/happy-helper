import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from '@/constants/app';
import type { AppDispatch } from '@/redux/app/store';
import { resetAuthState } from '@/redux/features/auth/auth.slice';
import { baseApi } from '@/redux/services/base-api';

interface TopNavbarProps {
  userName?: string;
  userInitials?: string;
}

const TopNavbar = ({
  userName = 'John Doe',
  userInitials = 'JD',
}: TopNavbarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const sectionLabel = segments[0]
    ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
    : APP_NAME;
  const currentPageSegment = segments[segments.length - 1];
  const pageLabel =
    !currentPageSegment || currentPageSegment === segments[0]
      ? 'Dashboard'
      : currentPageSegment
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(resetAuthState());
    dispatch(baseApi.util.resetApiState());
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/88 backdrop-blur-xl supports-[backdrop-filter]:bg-white/72">
      <div className="flex h-16 items-center justify-between gap-3 px-4 lg:h-14 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="-ml-1 h-10 w-10 rounded-xl border border-border/70 bg-white/85 shadow-sm transition-all hover:bg-muted/70 lg:h-9 lg:w-9 lg:border-transparent lg:bg-transparent lg:shadow-none" />
          <div className="min-w-0 md:hidden">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              {sectionLabel}
            </p>
            <p className="truncate text-sm font-semibold text-foreground">
              {pageLabel}
            </p>
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="h-9 w-56 rounded-xl border-border/70 bg-white/90 pl-9 text-sm shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl border border-border/70 bg-white/85 shadow-sm transition-all hover:bg-muted/70 lg:h-9 lg:w-9 lg:border-transparent lg:bg-transparent lg:shadow-none"
          >
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-xl border border-border/70 bg-white/85 px-1.5 shadow-sm transition-all hover:bg-muted/70 lg:h-9 lg:border-transparent lg:bg-transparent lg:px-2 lg:shadow-none"
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium text-foreground md:inline">
                  {userName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
