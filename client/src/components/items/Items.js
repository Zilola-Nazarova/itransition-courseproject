import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Paginated from '../Paginated';
import Item from './item/Item';
import { getCollectionItems } from '../../redux/items/itemsSlice';

const Items = () => {
  const navigate = useNavigate();
  const { location, state } = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { userId, collId } = useParams();
  useEffect(() => {
    if (page) {
      dispatch(getCollectionItems({ userId, collId, page }));
    }
  }, [dispatch, page, userId, collId]);
  useEffect(() => () => navigate(location, {}), []);
  const {
    value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.items);

  return (
    <Container
      fluid
      data-bs-theme="dark"
      className="items text-light"
    >
      <h3 className="text-center">ITEMS</h3>
      {state && (
        <Alert variant="success">
          {state.message}
        </Alert>
      )}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {value?.length > 0 && (
        <Paginated
          pageCount={numberOfPages}
          page={page}
          items={value}
          renderItem={(item) => <Item item={item} key={uuidv4()} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any items. Want to create one?</p>}
    </Container>
  );
};

export default Items;
