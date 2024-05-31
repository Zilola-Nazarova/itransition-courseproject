import Container from 'react-bootstrap/Container';
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
      <Container id="details" className="position-relative">
        <CollectionDetails />
      </Container>
      <Container id="form">
        <NewItem />
      </Container>
      <Container id="items">
        <Items />
      </Container>
    </>
  );
};

export default CollectionPage;
