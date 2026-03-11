import { Navigate } from 'react-router-dom';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import { useSelector } from 'react-redux';
import { getDashboardPathByRole, hasAccessToken } from '@/lib/auth';
import type { RootState } from '@/redux/app/store';

export default function DashboardRedirect() {
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

  if (!user?.role) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login?reason=session-expired" replace />;
  }

  return <Navigate to={getDashboardPathByRole(user.role)} replace />;
}
