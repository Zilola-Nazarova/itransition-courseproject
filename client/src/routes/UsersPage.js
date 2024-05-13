import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Users from '../components/users/Users';

const UsersPage = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <Users />
      {openForm
        ? <Link to="/users" onClick={() => setOpenForm(false)}>Close</Link>
        : <Link to="form" onClick={() => setOpenForm(true)}>Create User</Link>}
      <Outlet />
    </>
  );
};

export default UsersPage;
