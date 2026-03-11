import type { RouteObject } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/auth/Login';
import { SignUpPage } from '@/pages/auth/SignUp';
import GoogleCallbackPage from '@/pages/auth/GoogleCallback';
import PublicOnlyGuard from '@/guards/PublicOnlyGuard';
import DashboardRedirect from '@/pages/DashboardRedirect';

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    element: <PublicOnlyGuard />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
  { path: 'auth/google/callback', element: <GoogleCallbackPage /> },
  { path: 'dashboard', element: <DashboardRedirect /> },
];
