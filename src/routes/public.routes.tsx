import type { RouteObject } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const publicRoutes: RouteObject = {
  element: <PublicLayout />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ],
};
