import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      <Row>
        <Col xs={12} lg={4}>
          <UserDetails />
          <NewCollection />
        </Col>
        <Col>
          <Collections />
        </Col>
      </Row>
    </>
  );
};

export default UserPage;
