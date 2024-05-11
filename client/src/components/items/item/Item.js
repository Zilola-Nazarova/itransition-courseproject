import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateItem, deleteItem } from '../../../redux/items/itemsSlice';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const { _id, title, description } = item;
  const [itemData, setItemData] = useState({ _id, title, description });
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateItem(itemData));
    setOnEdit(false);
  };
  const updateForm = (
    <>
      <input
        placeholder={title}
        value={itemData.title}
        onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
      />
      <input
        placeholder={description}
        value={itemData.description}
        onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
      />
    </>
  );

  return (
    <div>
      <p>SINGLE ITEM</p>
      {onEdit ? (
        <>
          {updateForm}
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link to={`${item._id}`}>
            <p>{title}</p>
            <p>{description}</p>
          </Link>
          <button type="button" onClick={() => setOnEdit(true)}>Edit</button>
        </>
      )}
      <button type="button" onClick={() => dispatch(deleteItem(_id))}>Delete</button>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
