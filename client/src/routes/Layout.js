import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <nav>
      <h2>MY CATALOGUE</h2>
      <Link to="users">Users</Link>
      <Link to="items">Items</Link>
      <Link to="collections">Collections</Link>
    </nav>
    <div>
      <Outlet />
    </div>
  </>
);

export default Layout;
