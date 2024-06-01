import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';

const CollectionDetails = () => {
  const { collection, isLoading, error } = useSelector((state) => state.collections);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <Card border="success" data-bs-theme="dark">
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
        </Card>
      ) : (
        <p>
          Oops! Seems this collection doesn&apos;t exist.
          <br />
          Go back to Collections Page.
        </p>
      )}
    </>
  );
};

export default CollectionDetails;
