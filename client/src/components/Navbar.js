import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = null;

  return (
    <nav>
      <div>
        {user ? <button type="button">Sign Out</button> : <Link to="auth">Login</Link>}
      </div>
      <Link to="users">Users</Link>
      <Link to="items">Items</Link>
      <Link to="collections">Collections</Link>
    </nav>
  );
};

export default Navbar;
