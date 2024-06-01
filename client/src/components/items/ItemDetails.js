import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ItemDetails = () => {
  const { item, isLoading, error } = useSelector((state) => state.items);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {item ? (
        <Card border="success" data-bs-theme="dark">
          <Card.Header className="d-flex">
            <strong className="me-auto">Item</strong>
            <strong className="text-muted">
              By
              {' '}
              <a className="text-muted" href={`users/${item.author._id}/collections`}>{item.author.username}</a>
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
        </Card>
      ) : (
        <p>
          Oops! Seems this item doesn&apos;t exist.
          <br />
          Go back to Items Page.
        </p>
      )}
    </>
  );
};

export default ItemDetails;
