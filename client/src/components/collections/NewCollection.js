import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { postCollection } from '../../redux/collections/collectionsSlice';
import CreateClear from '../CreateClear';

const NewCollection = () => {
  const dispatch = useDispatch();
  const { value: categories, isLoading, error } = useSelector((state) => state.categories);
  const { userId } = useParams();
  const emptyCollectionObj = {
    title: '', text: '', category: '', image: '',
  };
  const [collectionData, setCollectionData] = useState(emptyCollectionObj);
  const clear = () => setCollectionData(emptyCollectionObj);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(collectionData).map((entry) => (
      formData.append(entry[0], entry[1])
    ));
    dispatch(postCollection({ userId, newCollection: formData }));
    clear();
  };
  const handleChange = (e) => {
    setCollectionData({ ...collectionData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Accordion data-bs-theme="dark">
        <Accordion.Item eventKey="0">
          <Accordion.Header>CREATE COLLECTION</Accordion.Header>
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
                  placeholder="Name the Collection"
                  value={collectionData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  name="text"
                  placeholder="Describe the Collection"
                  value={collectionData.text}
                  onChange={handleChange}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
              <Form.Select
                required
                name="category"
                onChange={(e) => setCollectionData({ ...collectionData, category: e.target.value })}
                value={collectionData.category}
              >
                <option>Select a category</option>
                {isLoading && <option value="none" disabled hidden>Browsing collections</option>}
                {error && <option value="none" disabled hidden>Could not browse categories. Please refresh the page.</option>}
                {categories.map((category) => (
                  <option key={uuidv4()} value={category}>{category}</option>
                ))}
              </Form.Select>
              <Form.Group>
                <Form.Control
                  type="file"
                  onChange={
                    (e) => setCollectionData({ ...collectionData, image: e.target.files[0] })
                  }
                />
              </Form.Group>
              <CreateClear clear={clear} />
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default NewCollection;
