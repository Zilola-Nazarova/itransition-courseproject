import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import CloseButton from 'react-bootstrap/CloseButton';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { postItem } from '../../redux/items/itemsSlice';
import TagInput from './TagInput';
import CreateClear from '../CreateClear';

const NewItem = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const emptyItemObj = { title: '', text: '' };
  const [itemData, setItemData] = useState(emptyItemObj);
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const clear = () => {
    setItemData(emptyItemObj);
    setTagValue('');
    setTags([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postItem({ userId, collId, newItem: { ...itemData, tags } }));
    clear();
  };
  const pushTag = (tag) => {
    setTags([...tags, tag]);
    setTagValue('');
  };
  const excludeTag = (toDelete) => {
    setTags(tags.filter((tag) => tag !== toDelete));
  };
  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  return (
    <Accordion data-bs-theme="dark">
      <Accordion.Item eventKey="0">
        <Accordion.Header>CREATE ITEM</Accordion.Header>
        <Accordion.Body>
          <Form
            className="text-start m-auto d-grid gap-3"
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                name="title"
                placeholder="Name the Item"
                value={itemData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                name="text"
                placeholder="Describe the Item"
                value={itemData.text}
                onChange={handleChange}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <ListGroup horizontal="md">
              {tags.map((tag) => (
                <ListGroup.Item key={uuidv4()}>
                  {tag}
                  <CloseButton
                    onClick={() => excludeTag(tag)}
                    aria-label="Hide"
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            {tagError && (
              <Alert variant="danger">
                Only letters, numbers and _ are allowed.
              </Alert>
            )}
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
            <CreateClear clear={clear} />
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default NewItem;
