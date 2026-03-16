import type { RouteObject } from 'react-router-dom';
import OwnerLayout from '@/layouts/OwnerLayout';
import RoleGuard from '@/guards/RoleGuard';
import OwnerDashboard from '@/pages/owner/OwnerDashboard';
import { UserRole } from '@/types/common/roles';
import OwnerOnboardingPage from '@/pages/owner/Onboarding';
import OwnerOnboardingGuard from '@/guards/OwnerOnboardingGuard';
import ComingSoonPage from '@/pages/common/ComingSoonPage';
import PropertiesListPage from '@/pages/owner/properties/PropertiesList';
import AddPropertyPage from '@/pages/owner/properties/AddProperty';
import PropertyDetailsPage from '@/pages/owner/properties/PropertyDetail';
import AddRoomPage from '@/pages/owner/properties/AddRoom';
import RoomDetailPage from '@/pages/owner/properties/RoomDetail';

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
            { path: 'properties', element: <PropertiesListPage /> },
            { path: 'properties/add', element: <AddPropertyPage /> },
            {
              path: 'properties/:propertyId/details',
              element: <PropertyDetailsPage />,
            },
            {
              path: 'properties/:propertyId/rooms/add',
              element: <AddRoomPage />,
            },
            {
              path: 'properties/:propertyId/rooms/:roomId',
              element: <RoomDetailPage />,
            },
            { path: 'tenants', element: <ComingSoonPage title="Tenants" /> },
          ],
        },
      ],
    },
  ],
};
