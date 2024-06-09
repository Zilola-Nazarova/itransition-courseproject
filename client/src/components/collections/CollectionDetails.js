import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useState } from 'react';
import { updateCollection, deleteCollection } from '../../redux/collections/collectionsSlice';
import ButtonGroup from '../buttonGroups/ButtonGroup';

const CollectionDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [imgPreview, setImgPreview] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const {
    value: cat, isLoading: catLoading, error: catError,
  } = useSelector((state) => state.categories);
  const {
    collection, isLoading, error,
  } = useSelector((state) => state.collections);
  const { user } = useSelector((state) => state.auth);
  const [collectionData, setCollectionData] = useState({});
  const handleChange = (e) => {
    setCollectionData({ ...collectionData, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(collectionData).map((entry) => (
      formData.append(entry[0], entry[1])
    ));
    dispatch(updateCollection({ userId, collId: collection._id, updatedCollection: formData }));
    setOnEdit(false);
  };
  const removeCollection = () => {
    dispatch(deleteCollection({
      userId, collId: collection._id, navigate,
    }));
  };
  const handlePreview = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImgPreview(null);
    }
  };
  const handleEdit = () => {
    setOnEdit(true);
    setImgPreview(collection.imageUrl);
    setCollectionData({ ...collection, newImage: undefined, deleteImage: false });
  };
  return (
    <>
      {error === 'Collection not found' && (
        <Alert variant="danger">
          Oops! Seems this collection doesn&apos;t exist.
          <br />
          Go back to Collections Page.
        </Alert>
      )}
      {error && error !== 'Collection not found' && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {collection && (
        <Card border="success" data-bs-theme="dark" className="collection">
          <Card.Header className="d-flex">
            <strong className="me-auto">Collection</strong>
            <strong className="text-muted">
              By
              {' '}
              <a className="text-muted" href={`/users/${collection.author._id}/collections`}>{collection.author.username}</a>
            </strong>
          </Card.Header>
            {onEdit ? (
              imgPreview
                && <div className="img-container"><Card.Img variant="top" src={imgPreview} /></div>
            ) : (
              collection.imageUrl
                && <div className="img-container"><Card.Img variant="top" src={collection.imageUrl} /></div>
            )}
          <Card.Body>
            {onEdit && (
              <>
                {imgPreview
                  && (
                    <Button
                      onClick={(e) => {
                        setCollectionData({ ...collectionData, deleteImage: true });
                        handlePreview(e);
                      }}
                    >
                      Delete image
                    </Button>
                  )}
                <Form.Group>
                  <Form.Label>Update image:</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      setCollectionData({
                        ...collectionData, newImage: e.target.files[0], deleteImage: true,
                      });
                      handlePreview(e);
                    }}
                  />
                </Form.Group>
              </>
            )}
            <Card.Title>
              {onEdit ? (
                <Form.Control
                  required
                  name="title"
                  value={collectionData.title}
                  onChange={handleChange}
                />
              ) : collection.title}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {onEdit ? (
                <select
                  required
                  name="category"
                  value={collectionData.category}
                  onChange={handleChange}
                >
                  <option value="none" disabled hidden>Please select a category</option>
                  {catLoading && <option value="none" disabled hidden>Browsing categories</option>}
                  {catError && <option value="none" disabled hidden>Could not browse categories. Please refresh the page.</option>}
                  {cat?.map((category) => (
                    <option key={uuidv4()} value={category}>{category}</option>
                  ))}
                </select>
              ) : collection.category}
            </Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
              {onEdit ? (
                <Form.Control
                  required
                  name="text"
                  value={collectionData.text}
                  onChange={handleChange}
                  as="textarea"
                />
              ) : collection.text}
            </Card.Text>
          </Card.Body>
          {(user?.user._id === collection.author._id || user?.user.role === 'Admin') && (
            <ButtonGroup
              onEdit={onEdit}
              cancel={() => setOnEdit(false)}
              save={handleSave}
              edit={handleEdit}
              del={removeCollection}
            />
          )}
        </Card>
      )}
    </>
  );
};

export default CollectionDetails;
