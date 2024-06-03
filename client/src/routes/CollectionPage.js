import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import Items from '../components/items/Items';
import { getCollection } from '../redux/collections/collectionsSlice';
import CollectionDetails from '../components/collections/CollectionDetails';
import NewItem from '../components/items/NewItem';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();

  useEffect(() => {
    dispatch(getCollection({ userId, collId }));
  }, [dispatch, collId, userId]);

  return (
    <>
      <h1 className="text-light mb-4">ITEMS</h1>
      <Row>
        <Col xs={12} lg={4} className="mb-4 d-grid gap-4">
          <CollectionDetails />
          <NewItem />
        </Col>
        <Col className="mb-2">
          <Items />
        </Col>
      </Row>
    </>
  );
};

export default CollectionPage;
