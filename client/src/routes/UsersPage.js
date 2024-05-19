import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/users/usersSlice';
import Users from '../components/users/Users';
import NewUser from '../components/users/NewUser';

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <h2>USERS PAGE</h2>
      <Users />
      <NewUser />
    </>
  );
};

export default UsersPage;
