import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { updateItem, deleteItem } from '../../redux/items/itemsSlice';
import ButtonGroup from '../buttonGroups/ButtonGroup';
import TagInput from './TagInput';

const ItemDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const [tagError, setTagError] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const [itemData, setItemData] = useState({});
  const [newTags, setNewTags] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { item, isLoading, error } = useSelector((state) => state.items);
  const pushTag = (tag) => {
    setNewTags([...newTags, tag]);
    setTagValue('');
  };
  const excludeTag = (toDelete) => {
    setNewTags(newTags.filter((tag) => tag !== toDelete));
  };
  useEffect(() => {
    setItemData(item);
    setNewTags(item?.tags.map((tag) => tag.tagname));
  }, [item]);
  const [onEdit, setOnEdit] = useState(false);
  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateItem({
      userId, collId, itemId: item._id, updatedItem: { ...itemData, tags: newTags },
    }));
    setOnEdit(false);
  };
  const removeItem = () => {
    dispatch(deleteItem({
      userId, collId, itemId: item._id, navigate,
    }));
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
        <Card border="success" data-bs-theme="dark" className="item">
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
            <Card.Title>
              {onEdit ? (
                <input
                  required
                  name="title"
                  value={itemData.title}
                  onChange={handleChange}
                />
              ) : item.title}
            </Card.Title>
            <Card.Text className="mb-2 text-muted">
              {onEdit ? (
                <textarea
                  required
                  name="text"
                  value={itemData.text}
                  onChange={handleChange}
                />
              ) : item.text}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush tags">
            {onEdit ? (
              newTags.map((tag) => (
                <ListGroup.Item key={uuidv4()}>
                  {tag}
                  <CloseButton
                    onClick={() => excludeTag(tag)}
                    aria-label="Remove tag"
                  />
                </ListGroup.Item>
              ))
            ) : (
              item.tags.map((tag) => (
                <ListGroup.Item
                  variant="success"
                  className="py-1"
                  action
                  key={uuidv4()}
                  href={`/tags/${tag._id}`}
                >
                  {`#${tag.tagname} `}
                  {onEdit && <button type="button" onClick={() => excludeTag(tag)}>X</button>}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {tagError && (
            <Alert variant="danger">
              Only letters, numbers and _ are allowed.
            </Alert>
          )}
          {onEdit && (
            <Card.Body>
              <Row>
                <Col xs={8}>
                  <TagInput
                    pushTag={pushTag}
                    value={tagValue}
                    setTagError={setTagError}
                    setValue={setTagValue}
                  />
                </Col>
                <Col xs={4}>
                  <Button
                    disabled={tagError}
                    className="btn-wide"
                    type="button"
                    onClick={() => pushTag(tagValue)}
                  >
                    Add tag
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          )}
          {(user?.user._id === item.author._id || user?.user.role === 'Admin') && (
            <ButtonGroup
              cancel={() => setOnEdit(false)}
              save={handleSave}
              edit={() => setOnEdit(true)}
              del={removeItem}
              onEdit={onEdit}
            />
          )}
        </Card>
      )}
    </>
  );
};

export default ItemDetails;
