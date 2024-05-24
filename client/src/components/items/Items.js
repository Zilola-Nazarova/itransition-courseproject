import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination';
import Item from './item/Item';

const Items = () => {
  const { value, isLoading, error } = useSelector((state) => state.items);

  return (
    <div id="items">
      <h3>ITEMS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value?.length > 0 && (
        <Pagination
          items={value}
          itemsPerPage={3}
          renderItem={(item) => <Item item={item} key={uuidv4()} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any items. Want to create one?</p>}
    </div>
  );
};

export default Items;
