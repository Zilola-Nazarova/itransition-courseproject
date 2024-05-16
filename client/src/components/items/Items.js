import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Item from './item/Item';

const Items = () => {
  const { value, isLoading, error } = useSelector((state) => state.items);
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {value.length > 0 ? value.map((item) => (
        <Item key={uuidv4()} item={item} />
      )) : <p>Oops! Seems you don&apos;t have any items. Want to create one?</p>}
    </div>
  );
};

export default Items;
