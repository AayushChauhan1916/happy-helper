import type { RouteObject } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/auth/Login';
import { SignUpPage } from '@/pages/auth/SignUp';

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: 'login', element: <LoginPage /> },
  { path: 'signup', element: <SignUpPage /> },
];
