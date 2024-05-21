import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { postItem } from '../../redux/items/itemsSlice';
import TagInput from './TagInput';

const NewItem = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const emptyItemObj = { title: '', text: '' };
  const [itemData, setItemData] = useState(emptyItemObj);
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState('');
  const clear = () => {
    setItemData(emptyItemObj);
    setValue('');
    setTags([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postItem({ userId, collId, newItem: { ...itemData, tags } }));
    clear();
  };

  const pushTag = (tag) => {
    setTags([...tags, tag]);
    setValue('');
  };
  const excludeTag = (toDelete) => {
    setTags(tags.filter((tag) => tag !== toDelete));
  };
  return (
    <div className="form">
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
        <ul>
          {tags.map((tag) => (
            <li key={uuidv4()}>
              {tag}
              <button type="button" onClick={() => excludeTag(tag)}>X</button>
            </li>
          ))}
        </ul>
        <TagInput
          pushTag={pushTag}
          value={value}
          setValue={setValue}
        />
        <button type="button" onClick={() => pushTag(value)}>Add tag</button>
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default NewItem;
