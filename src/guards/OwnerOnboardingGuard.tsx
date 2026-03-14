import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/app/store';
import AuthRouteLoader from '@/components/auth/AuthRouteLoader';
import { UserRole } from '@/types/common/roles';

interface OwnerOnboardingGuardProps {
  mode: 'require_onboarding' | 'require_dashboard';
}

export default function OwnerOnboardingGuard({
  mode,
}: OwnerOnboardingGuardProps) {
  const { user, isHydrating, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isInitialized || isHydrating) {
    return <AuthRouteLoader />;
  }

  if (!user || user.role !== UserRole.PROPERTY_ADMIN) {
    return <Navigate to="/login" replace />;
  }

  const isOwnerOnboardingCompleted = Boolean(user.isOnboarded);

  if (mode === 'require_onboarding' && isOwnerOnboardingCompleted) {
    return <Navigate to="/owner" replace />;
  }

  if (mode === 'require_dashboard' && !isOwnerOnboardingCompleted) {
    return <Navigate to="/owner/onboarding" replace />;
  }

  return <Outlet />;
}
