import { Navigate } from 'react-router-dom';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import { useMeQuery } from '@/redux/features/auth/auth.api';
import { getDashboardPathByRole, hasAccessToken } from '@/lib/auth';

export default function DashboardRedirect() {
  const isLoggedIn = hasAccessToken();
  const { data, isLoading, isFetching, isError } = useMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || isFetching) {
    return <AuthRouteLoader message="Loading your dashboard..." />;
  }

  if (isError || !data?.data?.role) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login?reason=session-expired" replace />;
  }

  return <Navigate to={getDashboardPathByRole(data.data.role)} replace />;
}
