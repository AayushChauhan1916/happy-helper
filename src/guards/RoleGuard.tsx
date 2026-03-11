import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDashboardPathByRole, hasAccessToken } from '@/lib/auth';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import type { RootState } from '@/redux/app/store';

interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const isLoggedIn = hasAccessToken();
  const { user, isHydrating, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isInitialized || isHydrating) {
    return <AuthRouteLoader />;
  }

  if (!user) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login?reason=session-expired" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPathByRole(user.role)} replace />;
  }

  return <Outlet />;
}
