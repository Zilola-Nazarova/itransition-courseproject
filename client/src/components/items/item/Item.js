import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { updateItem, deleteItem } from '../../../redux/items/itemsSlice';
import ClickOutside from '../../../helpers/ClickOutside';
import TagInput from '../TagInput';
import EditDelete from '../../EditDelete';

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const { user } = useSelector((state) => state.auth);
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
    <ListGroup.Item className="item-link py-0">
      <Row cassName="border-b position-relative">
        {onEdit ? updateForm : (
          <>
            <a
              aria-label="Navigate to item"
              href={`/users/${item.author}/collections/${item.coll}/items/${item._id}`}
              className="stretched-link"
            />
            <Col sm={12} md={3} className="py-3"><h3>{title}</h3></Col>
            <Col sm={12} md={6} className="odd-col py-3">{text}</Col>
            <Col className="tags py-3">
              {tags.map((tag) => (
                <span key={uuidv4()} className="tag">
                  <a href={`tags/${tag._id}`}>
                    {`#${tag.tagname}`}
                  </a>
                  {' '}
                </span>
              ))}
            </Col>
            {(user?.user._id === item.author || user?.user.role === 'Admin') && (
              <EditDelete
                edit={() => setOnEdit(true)}
                del={() => dispatch(deleteItem({ userId, collId, itemId: _id }))}
              />
            )}
          </>
        )}
      </Row>
    </ListGroup.Item>
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
