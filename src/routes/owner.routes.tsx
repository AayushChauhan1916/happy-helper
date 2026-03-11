import type { RouteObject } from 'react-router-dom';
import OwnerLayout from '@/layouts/OwnerLayout';
import RoleGuard from '@/guards/RoleGuard';
import OwnerDashboard from '@/pages/owner/OwnerDashboard';
import { UserRole } from '@/types/common/roles';
import OwnerOnboardingPage from '@/pages/owner/Onboarding';
import OwnerOnboardingGuard from '@/guards/OwnerOnboardingGuard';
import ComingSoonPage from '@/pages/common/ComingSoonPage';

export const ownerRoutes: RouteObject = {
  path: 'owner',
  element: <RoleGuard allowedRoles={[UserRole.PROPERTY_ADMIN]} />,
  children: [
    {
      element: <OwnerOnboardingGuard mode="require_onboarding" />,
      children: [{ path: 'onboarding', element: <OwnerOnboardingPage /> }],
    },
    {
      element: <OwnerOnboardingGuard mode="require_dashboard" />,
      children: [
        {
          element: <OwnerLayout />,
          children: [
            { index: true, element: <OwnerDashboard /> },
            { path: 'dashboard', element: <OwnerDashboard /> },
            { path: 'properties', element: <ComingSoonPage title="Properties" /> },
            { path: 'tenants', element: <ComingSoonPage title="Tenants" /> },
          ],
        },
      ],
    },
  ],
};
