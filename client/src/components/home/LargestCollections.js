import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const LargestCollections = () => {
  const { largestCollections } = useSelector((state) => state.home);

  return (
    <Container
      id="largest-collections"
      className="p-3 green-bg d-flex flex-column gap-3"
      data-bs-theme="dark"
    >
      <h2 className="text-light text-center">
        LARGEST COLLECTIONS
      </h2>
      {largestCollections && largestCollections.map((collection) => (
        <Card key={uuidv4()}>
          <Card.Header className="d-flex">
            <strong className="text-muted me-auto">
              {`${collection.itemCount} items`}
            </strong>
            <strong className="text-link text-muted">
              <a href={`users/${collection.author._id}/collections`}>
                {`By ${collection.author.username}`}
              </a>
            </strong>
          </Card.Header>
          {collection.imageUrl
            && <Card.Img variant="top" src={collection.imageUrl} />}
          <Card.Body className="item-link position-relative">
            <Card.Title>{collection.title}</Card.Title>
            <Card.Text>{collection.text}</Card.Text>
            <a
              aria-label="Navigate to collection"
              href={`users/${collection.author._id}/collections/${collection._id}/items`}
              className="stretched-link"
            />
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default LargestCollections;
