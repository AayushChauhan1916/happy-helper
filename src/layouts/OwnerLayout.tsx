import { Outlet, Link } from 'react-router-dom';

export default function OwnerLayout() {
  return (
    <div>
      <h2>Owner Layout</h2>
      <nav>
        <Link to="/owner/dashboard">Owner Dashboard</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
