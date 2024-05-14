import { Link, Outlet, useLocation } from 'react-router-dom';
import Users from '../components/users/Users';

const UsersPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <h3>USERS COMPONENT</h3>
      <Users />
      {pathname === '/users/form'
        ? <Link to="/users">Close</Link>
        : <Link to="form">Create User</Link>}
      <Outlet />
    </>
  );
};

export default UsersPage;
