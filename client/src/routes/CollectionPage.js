import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Items from '../components/items/Items';
import { getCollection } from '../redux/collections/collectionsSlice';
import CollectionDetails from '../components/collections/CollectionDetails';
import NewItem from '../components/items/NewItem';
import { getCategories } from '../redux/categories/categoriesSlice';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCollection({ userId, collId }));
    dispatch(getCategories());
  }, [dispatch, collId, userId]);

  return (
    <Row data-bs-theme="dark">
      <Col xs={12} lg={4} className="mb-4 d-grid gap-4">
        <CollectionDetails />
        {(user?.user._id === userId || user?.user.role === 'Admin') && (
          <NewItem />
        )}
      </Col>
      <Col className="mb-2">
        <Items />
      </Col>
    </Row>
  );
};

export default CollectionPage;
