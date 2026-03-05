import { Navigate, Outlet } from 'react-router-dom';

interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  // Later replace this with real auth context or redux
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
