import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <h2>Public Layout</h2>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}