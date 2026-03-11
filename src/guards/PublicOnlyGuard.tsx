import { Navigate, Outlet } from 'react-router-dom';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import { useMeQuery } from '@/redux/features/auth/auth.api';
import { getDashboardPathByRole, hasAccessToken } from '@/lib/auth';

export default function PublicOnlyGuard() {
  const isLoggedIn = hasAccessToken();
  const { data, isLoading, isFetching } = useMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  if (!isLoggedIn) {
    return <Outlet />;
  }

  if (isLoading || isFetching) {
    return <AuthRouteLoader message="Checking your account..." />;
  }

  if (data?.data?.role) {
    return <Navigate to={getDashboardPathByRole(data.data.role)} replace />;
  }

  localStorage.removeItem('accessToken');
  return <Outlet />;
}
