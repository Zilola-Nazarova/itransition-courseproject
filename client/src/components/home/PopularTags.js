import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
// import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const PopularTags = () => {
  const { popularTags } = useSelector((state) => state.home);

  return (
    <Container
      id="popular-tags"
      className="p-3 green-bg d-flex flex-column gap-3"
      data-bs-theme="dark"
    >
      <h2 className="text-light text-center">
        POPULAR TAGS
      </h2>
      <ListGroup>
        {popularTags && popularTags.map((tag) => (
          <ListGroup.Item
            key={uuidv4()}
            className="item-link position-relative d-flex"
          >
            <span className="tag me-auto">
              {`#${tag.tagname}`}
            </span>
            <span>{`${tag.itemCount} items`}</span>
            <a
              aria-label="Navigate to tag"
              href={`/tags/${tag._id}`}
              className="stretched-link"
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default PopularTags;
