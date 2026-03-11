import type { RouteObject } from 'react-router-dom';
import OwnerLayout from '@/layouts/OwnerLayout';
import RoleGuard from '@/guards/RoleGuard';
import OwnerDashboard from '@/pages/owner/OwnerDashboard';
import { UserRole } from '@/types/common/roles';
import OwnerOnboardingPage from '@/pages/owner/Onboarding';

export const ownerRoutes: RouteObject = {
  path: 'owner',
  element: <RoleGuard allowedRoles={[UserRole.PROPERTY_ADMIN]} />,
  children: [
    {
      path: 'onboarding',
      element: <OwnerOnboardingPage />,
    },
    {
      element: <OwnerLayout />,
      children: [{ index: true, element: <OwnerDashboard /> }],
    },
  ],
};
