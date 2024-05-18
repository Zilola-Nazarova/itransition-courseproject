import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUsers } from '../redux/users/usersSlice';
import Users from '../components/users/Users';
import NewUser from '../components/users/NewUser';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <h2>USERS PAGE</h2>
      <Users />
      {pathname === '/users/form'
        ? <Link to="/users">Close</Link>
        : <Link to="form">Create User</Link>}
      <NewUser />
    </>
  );
};

export default UsersPage;
