import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import Items from '../components/items/Items';
import { getCollection } from '../redux/collections/collectionsSlice';
import CollectionDetails from '../components/collections/CollectionDetails';
import { getCategories } from '../redux/categories/categoriesSlice';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();

  useEffect(() => {
    dispatch(getCollection({ userId, collId }));
    dispatch(getCategories());
  }, [dispatch, collId, userId]);

  return (
    <Container
      className="main-container"
    >
      <Row data-bs-theme="dark" className="gap-4">
        <Col xs={12} lg={4} className="mb-4 d-grid gap-4">
          <CollectionDetails />
        </Col>
        <Col className="mb-2">
          <Items />
        </Col>
      </Row>
    </Container>
  );
};

export default CollectionPage;
