import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Item = ({ item }) => {
  const { title, text, tags } = item;

  return (
    <ListGroup.Item className="item-link py-0">
      <Row className="border-b position-relative">
        <a
          aria-label="Navigate to item"
          href={`/users/${item.author}/collections/${item.coll}/items/${item._id}`}
          className="stretched-link"
        />
        <Col sm={12} md={3} className="py-3"><h3>{title}</h3></Col>
        <Col sm={12} md={6} className="odd-col py-3">{text}</Col>
        <Col className="py-3">
          {tags.map((tag) => (
            <span key={uuidv4()} className="tag click-above">
              <a href={`/tags/${tag._id}`}>
                {`#${tag.tagname}`}
              </a>
              {' '}
            </span>
          ))}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coll: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      tagname: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default Item;
