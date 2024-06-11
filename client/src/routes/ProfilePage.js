import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserDetails from '../components/users/UserDetails';
import { getUser } from '../redux/users/usersSlice';
import { getCategories } from '../redux/categories/categoriesSlice';
import JiraRequests from '../components/profile/JiraRequests';
import Odoo from '../components/profile/Odoo';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser(user.user._id));
    dispatch(getCategories());
  }, [dispatch, user]);

  return (
    <Container
      className="width-limit"
      data-bs-theme="dark"
    >
      <h1 className="text-light mb-4">MY PROFILE</h1>
      <UserDetails user={user.user} />
      <Odoo />
      <Link to={`/users/${user.user._id}/collections`}>
        <h2>MY COLLECTIONS</h2>
      </Link>
      <JiraRequests />
    </Container>
  );
};

export default ProfilePage;
