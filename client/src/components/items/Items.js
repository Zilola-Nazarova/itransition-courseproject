import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router';
import Paginated from '../Paginated';
import Item from './item/Item';
import { getCollectionItems } from '../../redux/items/itemsSlice';

const Items = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { userId, collId } = useParams();
  useEffect(() => {
    if (page) {
      dispatch(getCollectionItems({ userId, collId, page }));
    }
  }, [dispatch, page, userId, collId]);
  const {
    value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.items);

  return (
    <>
      <h3>ITEMS</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
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
    </>
  );
};

export default Items;
