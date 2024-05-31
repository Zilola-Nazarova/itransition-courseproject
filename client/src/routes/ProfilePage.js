import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserDetails from '../components/users/UserDetails';
import { getUser } from '../redux/users/usersSlice';
import { getCategories } from '../redux/categories/categoriesSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser(user.user._id));
    dispatch(getCategories());
  }, [dispatch, user]);

  return (
    <>
      <section>
        <h2>MY PROFILE</h2>
        <UserDetails user={user.user} />
      </section>
      <section>
        <Link to={`/users/${user.user._id}/collections`}>
          <h2>MY COLLECTIONS</h2>
        </Link>
      </section>
    </>
  );
};

export default ProfilePage;
