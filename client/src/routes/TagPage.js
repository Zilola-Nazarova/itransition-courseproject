import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getTagItems } from '../redux/tags/tagsSlice';
import Paginated from '../components/Paginated';
import Item from '../components/items/item/Item';

const TagPage = () => {
  const dispatch = useDispatch();
  const { tagId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  useEffect(() => {
    if (page) {
      dispatch(getTagItems({ tagId, page }));
    }
  }, [dispatch, tagId, page]);
  const {
    tag, value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.tags);

  return (
    <Container
      fluid
      data-bs-theme="dark"
      className="p-4 green-bg width-limit"
    >
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
        <>
          <h2 className="text-center text-light pb-2">
            {`ITEMS IN #${tag.tagname}`}
          </h2>
          <Paginated
            pageCount={numberOfPages}
            page={page}
            slice="tags"
            renderItem={(item) => <Item item={item} key={uuidv4()} />}
          />
        </>
      )}
      {value?.length === 0
        && <p>Oops! Seems there are no items with this tag.</p>}
    </Container>
  );
};

export default TagPage;
