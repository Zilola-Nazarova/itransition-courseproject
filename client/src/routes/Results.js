import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Item from '../components/items/item/Item';
import Collection from '../components/collections/collection/Collection';
import Pagination from '../components/Pagination';

const Results = () => {
  const { searchResults, error, isLoading } = useSelector((state) => state.search);

  return (
    <div id="items">
      <h3>ITEMS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {searchResults?.length > 0 && (
        <Pagination
          items={searchResults}
          itemsPerPage={3}
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
        && <p>Oops! Seems you don&apos;t have any items. Want to create one?</p>}
    </div>
  );
};

export default Results;
