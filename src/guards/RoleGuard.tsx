import { Navigate, Outlet } from 'react-router-dom';
import { useMeQuery } from '@/redux/features/auth/auth.api';
import { getDashboardPathByRole, hasAccessToken } from '@/lib/auth';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';

interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const isLoggedIn = hasAccessToken();
  const { data, isLoading, isFetching, isError } = useMeQuery(undefined);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || isFetching) {
    return <AuthRouteLoader message="Loading your dashboard..." />;
  }

  if (isError || !data?.data) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login?reason=session-expired" replace />;
  }

  if (!allowedRoles.includes(data.data.role)) {
    return <Navigate to={getDashboardPathByRole(data.data.role)} replace />;
  }

  return <Outlet />;
}
