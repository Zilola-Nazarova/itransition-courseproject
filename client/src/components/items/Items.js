import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Item from './item/Item';

const Items = () => {
  const items = useSelector((state) => state.items.value);

  return (
    <div>
      <h3>ITEMS COMPONENT</h3>
      {items.map((item) => (
        <Item key={uuidv4()} item={item} />
      ))}
    </div>
  );
};

export default Items;
