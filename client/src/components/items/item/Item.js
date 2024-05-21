import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateItem, deleteItem } from '../../../redux/items/itemsSlice';
import ClickOutside from '../../../helpers/ClickOutside';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const { _id, title, text } = item;
  const [itemData, setItemData] = useState(item);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem({
      userId, collId, itemId: _id, updatedItem: itemData,
    }));
    setOnEdit(false);
  };
  const updateForm = (
    <ClickOutside onClick={() => { setOnEdit(false); setItemData(item); }}>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder={title}
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <input
          required
          placeholder={text}
          value={itemData.text}
          onChange={(e) => setItemData({ ...itemData, text: e.target.value })}
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
          <Link to={`${item._id}`}>
            <p>{_id}</p>
            <p>{title}</p>
            <p>{text}</p>
          </Link>
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
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
