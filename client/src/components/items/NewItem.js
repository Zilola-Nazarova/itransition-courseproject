import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../../redux/items/itemsSlice';

const NewItem = () => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({
    title: '',
    description: '',
  });
  const clear = () => {
    setItemData({
      title: '',
      description: '',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem(itemData));
    clear();
  };

  return (
    <>
      <h3>CREATE ITEM</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="title"
          label="title"
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <input
          name="description"
          placeholder="description"
          label="description"
          value={itemData.description}
          onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewItem;
