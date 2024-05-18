import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserDetails from '../components/users/UserDetails';
import Collections from '../components/collections/Collections';
import { getUserCollections } from '../redux/collections/collectionsSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('GETTING USERCOLLECTIONS');
    dispatch(getUserCollections(userId));
  }, [dispatch, userId]);

  return (
    <>
      <h2>USER COLLECTIONS PAGE</h2>
      <UserDetails />
      <Collections />
      {pathname === `/users/${userId}/collections/form`
        ? <Link to={`/users/${userId}/collections`}>Close</Link>
        : <Link to="form">Create Collection</Link>}
      <Outlet />
    </>
  );
};

export default UserPage;
