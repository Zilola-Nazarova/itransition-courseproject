import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Paginated from '../Paginated';
import Collection from './collection/Collection';
import { getUserCollections } from '../../redux/collections/collectionsSlice';

const Collections = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { userId } = useParams();
  const [state] = useState(location.state || null);
  useEffect(() => {
    if (page) {
      dispatch(getUserCollections({ userId, page }));
    }
  }, [dispatch, page, userId]);
  useEffect(() => {
    navigate('.', { replace: true });
  }, [navigate]);
  const {
    value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.collections);

  return (
    <Container
      fluid
      data-bs-theme="dark"
      className="collections text-light"
    >
      <h3>COLLECTIONS</h3>
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
          slice="collections"
          renderItem={(item) => <Collection collection={item} key={uuidv4()} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any collections. Want to create one?</p>}
    </Container>
  );
};

export default Collections;
