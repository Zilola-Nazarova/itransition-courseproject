import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateItem, deleteItem } from '../../../redux/items/itemsSlice';
import ClickOutside from '../../../helpers/ClickOutside';
import TagInput from '../TagInput';
import EditDelete from '../../EditDelete';

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
    <Row className="item position-relative">
      {onEdit ? updateForm : (
        <>
          <a
            href={`/users/${item.author}/collections/${item.coll}/items/${item._id}`}
            className="stretched-link"
            aria-label="Open Collection"
          />
          <Col sm={12} md={2}><h3>{title}</h3></Col>
          <Col sm={12} md={6}><p>{text}</p></Col>
          <Col className="tags">
            {tags.map((tag) => (
              <Link to={`/tags/${tag._id}`} key={uuidv4()}>
                {`#${tag.tagname} `}
              </Link>
            ))}
          </Col>
          <EditDelete
            edit={() => setOnEdit(true)}
            del={() => dispatch(deleteItem({ userId, collId, itemId: _id }))}
          />
        </>
      )}
    </Row>
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
