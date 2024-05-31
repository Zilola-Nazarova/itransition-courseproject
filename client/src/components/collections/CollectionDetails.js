import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CollectionDetails = () => {
  const { collection, isLoading, error } = useSelector((state) => state.collections);
  const { userId } = useParams();

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <Row>
          {collection.imageUrl
            ? (
              <Col>
                <img className="big-img" src={collection.imageUrl} alt={collection.title} />
              </Col>
            ) : <p>No image provided</p>}
          <Col sm={12} md={8}>
            <h3>
              {collection.title}
              <br />
              <small className="text-muted">{collection.category}</small>
            </h3>
            <p>{collection.text}</p>
          </Col>
          <a
            href={`/users/${userId}/collections/${collection._id}/items`}
            className="stretched-link"
            aria-label="Open Collection"
          />
        </Row>
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
