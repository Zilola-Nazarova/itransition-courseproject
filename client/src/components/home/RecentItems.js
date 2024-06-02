import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const RecentItems = () => {
  const { recentItems } = useSelector((state) => state.home);

  return (
    <Container
      id="recent-items"
      className="p-3 bg d-flex flex-column gap-3"
      data-bs-theme="dark"
    >
      <h2 className="text-light text-center">
        LATEST ITEMS
      </h2>
      {recentItems && recentItems.map((item) => (
        <Card key={uuidv4()}>
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
          <Card.Body className="item-link position-relative">
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.text}</Card.Text>
            <a
              aria-label="Navigate to item"
              href={`users/${item.author._id}/collections/${item.coll._id}/items/${item._id}`}
              className="stretched-link"
            />
          </Card.Body>
          <Card.Footer>
            {item.tags.map((tag) => (
              <span key={uuidv4()} className="tag">
                <a href={`tags/${tag._id}`}>
                  {`#${tag.tagname}`}
                </a>
                {' '}
              </span>
            ))}
          </Card.Footer>
        </Card>
      ))}
    </Container>
  );
};

export default RecentItems;
