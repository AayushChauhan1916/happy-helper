import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { publicRoutes } from './public.routes';
import { ownerRoutes } from './owner.routes';
import { adminRoutes } from './admin.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [publicRoutes, ownerRoutes, adminRoutes],
  },
]);
