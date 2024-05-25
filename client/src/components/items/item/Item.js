import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateItem, deleteItem } from '../../../redux/items/itemsSlice';
import ClickOutside from '../../../helpers/ClickOutside';
import TagInput from '../TagInput';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const {
    _id, title, text, tags,
  } = item;
  const [itemData, setItemData] = useState(item);
  const [newTags, setNewTags] = useState(tags.map((tag) => tag.tagname));
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({
      userId, collId, itemId: _id, updatedItem: { ...itemData, tags: newTags },
    }));
    setOnEdit(false);
  };
  const pushTag = (tag) => {
    setNewTags([...newTags, tag]);
    setValue('');
  };
  const excludeTag = (toDelete) => {
    setNewTags(newTags.filter((tag) => tag !== toDelete));
  };
  const updateForm = (
    <ClickOutside
      onClick={() => {
        setOnEdit(false);
        setItemData(item);
        setValue('');
        setNewTags([]);
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder={title}
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <textarea
          required
          placeholder={text}
          value={itemData.text}
          onChange={(e) => setItemData({ ...itemData, text: e.target.value })}
        />
        <ul>
          {newTags.map((tag) => (
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
        <button type="submit">Save</button>
      </form>
    </ClickOutside>
  );

  return (
    <div className="item">
      <p>SINGLE ITEM</p>
      {onEdit ? updateForm : (
        <div>
          <Link to={`/users/${item.author}/collections/${item.coll}/items/${item._id}`}>
            <p>{_id}</p>
            <p>{title}</p>
            <p>{text}</p>
          </Link>
          {tags.map((tag) => (
            <Link to={`/tags/${tag._id}`} key={uuidv4()}>{tag.tagname}</Link>
          ))}
          <button type="button" onClick={() => setOnEdit(true)}>Edit</button>
        </div>
      )}
      <button type="button" onClick={() => dispatch(deleteItem({ userId, collId, itemId: _id }))}>Delete</button>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coll: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      tagname: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default Item;
