import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router';
import Paginated from '../Paginated';
import Collection from './collection/Collection';
import { getUserCollections } from '../../redux/collections/collectionsSlice';

const Collections = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { userId } = useParams();
  useEffect(() => {
    if (page) {
      dispatch(getUserCollections({ userId, page }));
    }
  }, [dispatch, page, userId]);
  const {
    value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.collections);

  return (
    <Container fluid data-bs-theme="dark" className="text-light">
      <h3>COLLECTIONS</h3>
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
          renderItem={(item) => <Collection collection={item} key={uuidv4()} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any collections. Want to create one?</p>}
    </Container>
  );
};

export default Collections;
