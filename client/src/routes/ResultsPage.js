import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import Item from '../components/items/item/Item';
import Collection from '../components/collections/collection/Collection';
import Paginated from '../components/Paginated';
import { getItemsBySearch } from '../redux/search/searchSlice';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const searchQuery = searchParams.get('searchQuery');
  useEffect(() => {
    if (page && searchQuery) {
      dispatch(getItemsBySearch({ searchQuery, page }));
    }
  }, [dispatch, page, searchQuery]);
  const {
    searchResults, numberOfPages, isLoading, error,
  } = useSelector((state) => state.search);

  return (
    <div id="items">
      <h3>ITEMS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {searchResults?.length > 0 && (
        <Paginated
          items={searchResults}
          pageCount={numberOfPages}
          page={page}
          renderItem={(item) => {
            let renderedItem;
            if (item.type === 'item') renderedItem = <Item item={item} key={uuidv4()} />;
            if (item.type === 'collection') renderedItem = <Collection collection={item} key={uuidv4()} />;
            if (item.type === 'comment') {
              renderedItem = (
                <div key={uuidv4()}>
                  <Item item={item.item} />
                  <p>{item.text}</p>
                </div>
              );
            }
            return renderedItem;
          }}
        />
      )}
      {searchResults?.length === 0
        && <p>Nothing matched your search!</p>}
    </div>
  );
};

export default ResultsPage;
