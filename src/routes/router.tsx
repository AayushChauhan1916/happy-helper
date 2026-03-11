import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { publicRoutes } from './public.routes';
import { ownerRoutes } from './owner.routes';
import { adminRoutes } from './admin.routes';
import { tenantRoutes } from './tenant.routes';
import RouteErrorPage from '@/pages/common/RouteErrorPage';
import NotFoundPage from '@/pages/common/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [...publicRoutes, tenantRoutes, ownerRoutes, adminRoutes, { path: '*', element: <NotFoundPage /> }],
  },
]);
