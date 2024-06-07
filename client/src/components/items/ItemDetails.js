import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { updateItem, deleteItem } from '../../redux/items/itemsSlice';
import ClickOutside from '../../helpers/ClickOutside';
import EditDelete from '../EditDelete';
import UpdateItem from './UpdateItem';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { item, isLoading, error } = useSelector((state) => state.items);
  const [itemData, setItemData] = useState({});
  const [newTags, setNewTags] = useState([]);
  useEffect(() => {
    setItemData(item);
    setNewTags(item?.tags.map((tag) => tag.tagname));
  }, [item]);
  const [onEdit, setOnEdit] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateItem({
      userId, collId, itemId: item._id, updatedItem: { ...itemData, tags: newTags },
    }));
    setOnEdit(false);
  };

  return (
    <>
      {error === 'Item not found' && (
        <Alert variant="danger">
          Oops! Seems this item doesn&apos;t exist.
          <br />
          Go back to Items Page.
        </Alert>
      )}
      {error && error !== 'Item not found' && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {item && (
        <Card border="success" data-bs-theme="dark">
          <Card.Header className="d-flex">
            <strong className="me-auto text-link">
              In
              {' '}
              <a href={`users/${item.author._id}/collections/${item.coll._id}/items`}>
                {item.coll.title}
              </a>
            </strong>
            <strong className="text-link">
              By
              {' '}
              <a href={`users/${item.author._id}/collections`}>
                {item.author.username}
              </a>
            </strong>
          </Card.Header>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text className="mb-2 text-muted">
              {item.text}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush tags">
            {item.tags.map((tag) => (
              <ListGroup.Item
                variant="success"
                className="py-1"
                action
                key={uuidv4()}
                href={`/tags/${tag._id}`}
              >
                {`#${tag.tagname} `}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {(user?.user._id === item.author._id || user?.user.role === 'Admin') && (
            <EditDelete
              edit={() => setOnEdit(true)}
              del={() => dispatch(deleteItem({ userId, collId, itemId: item._id }))}
            />
          )}
        </Card>
      )}
      {onEdit && (
        <ClickOutside
          onClick={() => {
            setOnEdit(false);
            setItemData(item);
            // setValue('');
            setNewTags([]);
          }}
        >
          <UpdateItem
            itemData={itemData}
            item={item}
            newTags={newTags}
            setNewTags={setNewTags}
            handleChange={(data) => setItemData(data)}
          />
          <button type="button" onClick={handleSave}>Save</button>
        </ClickOutside>
      )}
    </>
  );
};

export default ItemDetails;
