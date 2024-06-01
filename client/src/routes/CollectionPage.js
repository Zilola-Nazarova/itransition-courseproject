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
      <h2>COLLECTION ITEMS PAGE</h2>
      <Row>
        <Col xs={12} lg={4}>
          <CollectionDetails />
          <NewItem />
        </Col>
        <Col>
          <Items />
        </Col>
      </Row>
    </>
  );
};

export default CollectionPage;
