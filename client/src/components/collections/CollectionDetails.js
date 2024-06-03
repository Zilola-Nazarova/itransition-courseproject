import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import EditDelete from '../EditDelete';
import UpdateCollection from './UpdateCollection';
import { updateCollection, deleteCollection } from '../../redux/collections/collectionsSlice';

const CollectionDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { collection, isLoading, error } = useSelector((state) => state.collections);
  const { user } = useSelector((state) => state.auth);
  const [onEdit, setOnEdit] = useState(false);
  const [collectionData, setCollectionData] = useState(collection);
  useEffect(() => {
    setCollectionData(collection);
  }, [collection]);
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(collectionData).map((entry) => (
      formData.append(entry[0], entry[1])
    ));
    dispatch(updateCollection({ userId, collId: collection._id, updatedCollection: formData }));
    setOnEdit(false);
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <Card border="success" data-bs-theme="dark">
          <Card.Header className="d-flex">
            <strong className="me-auto">Collection</strong>
            <strong className="text-muted">
              By
              {' '}
              <a className="text-muted" href={`/users/${collection.author._id}/collections`}>{collection.author.username}</a>
            </strong>
          </Card.Header>
          {collection.imageUrl
            && <Card.Img variant="top" src={collection.imageUrl} />}
          <Card.Body>
            <Card.Title>{collection.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {collection.category}
            </Card.Subtitle>
            <Card.Text className="mb-2 text-muted">
              {collection.text}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {(user?.user._id === collection.author._id || user?.user.role === 'Admin') && (
              <EditDelete
                edit={() => setOnEdit(true)}
                del={() => dispatch(deleteCollection({ userId, collId: collection._id }))}
              />
            )}
          </Card.Footer>
        </Card>
      ) : (
        <p>
          Oops! Seems this collection doesn&apos;t exist.
          <br />
          Go back to Collections Page.
        </p>
      )}
      {onEdit && (
        <>
          <UpdateCollection
            collectionData={collectionData}
            collection={collection}
            handleChange={(data) => setCollectionData(data)}
          />
          <button type="button" onClick={handleSave}>Save</button>
        </>
      )}
    </>
  );
};

export default CollectionDetails;
