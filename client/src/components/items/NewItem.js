import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postItem } from '../../redux/items/itemsSlice';

const NewItem = () => {
  const dispatch = useDispatch();
  const emptyItemObj = {
    title: '',
    text: '',
  };
  const [itemData, setItemData] = useState(emptyItemObj);
  const clear = () => setItemData(emptyItemObj);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postItem(itemData));
    clear();
  };

  return (
    <>
      <h3>CREATE ITEM</h3>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="title"
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <input
          required
          placeholder="text"
          value={itemData.text}
          onChange={(e) => setItemData({ ...itemData, text: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewItem;
