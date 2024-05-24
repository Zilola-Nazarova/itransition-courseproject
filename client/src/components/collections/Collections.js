import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import Paginated from '../Paginated';
import Collection from './collection/Collection';
import { getUserCollections } from '../../redux/collections/collectionsSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Collections = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const page = query.get('page') || '1';
  const { userId } = useParams();
  useEffect(() => {
    if (page) {
      dispatch(getUserCollections({ userId, page }));
    }
  }, [dispatch, page]);
  const {
    value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.collections);

  return (
    <div id="collections">
      <h3>COLLECTIONS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
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
    </div>
  );
};

export default Collections;
