import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <h2>Admin Layout</h2>
      <nav>
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
