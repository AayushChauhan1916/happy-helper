import { Navigate, Outlet } from 'react-router-dom';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import { useSelector } from 'react-redux';
import { getDashboardPathByRole, hasAccessToken } from '@/lib/auth';
import type { RootState } from '@/redux/app/store';

export default function PublicOnlyGuard() {
  const isLoggedIn = hasAccessToken();
  const { user, isHydrating, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isLoggedIn) {
    return <Outlet />;
  }

  if (!isInitialized || isHydrating) {
    return <AuthRouteLoader />;
  }

  if (user?.role) {
    return <Navigate to={getDashboardPathByRole(user.role)} replace />;
  }

  localStorage.removeItem('accessToken');
  return <Outlet />;
}
