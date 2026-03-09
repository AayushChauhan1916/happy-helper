import type { RouteObject } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/auth/Login';
import { SignUpPage } from '@/pages/auth/SignUp';
import GoogleCallbackPage from '@/pages/auth/GoogleCallback';

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: 'login', element: <LoginPage /> },
  { path: 'auth/google/callback', element: <GoogleCallbackPage /> },
  { path: 'signup', element: <SignUpPage /> },
];
