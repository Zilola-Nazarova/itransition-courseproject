import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../../redux/items/itemsSlice';

const NewItem = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({
    id: '',
    name: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem(itemData));
  };
  const clear = () => {
    setItemData({
      id: '',
      name: '',
    });
  };

  return (
    <>
      <h3>CREATE ITEM</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="number"
          placeholder="5"
          label="id"
          value={itemData.id}
          onChange={(e) => setItemData({ ...itemData, id: e.target.valueAsNumber })}
        />
        <input
          name="name"
          placeholder="Item #5"
          label="name"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewItem;
