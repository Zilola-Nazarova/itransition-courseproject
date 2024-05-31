import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import UserDetails from '../components/users/UserDetails';
import Collections from '../components/collections/Collections';
import { getUser } from '../redux/users/usersSlice';
import NewCollection from '../components/collections/NewCollection';
import { getCategories } from '../redux/categories/categoriesSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getCategories());
  }, [dispatch, userId]);

  return (
    <>
      <h2>USER COLLECTIONS PAGE</h2>
      <Container id="details" className="position-relative">
        <UserDetails />
      </Container>
      <Container id="form">
        <NewCollection />
      </Container>
      <Container id="collections">
        <Collections />
      </Container>
    </>
  );
};

export default UserPage;
