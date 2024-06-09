import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const Collection = ({ collection }) => {
  const {
    title, text, category, imageUrl,
  } = collection;
  const truncatedText = text.length > 300 ? `${text.substring(0, 300)}...` : text;

  return (
    <ListGroup.Item className="item-link py-0">
      <Row className="border-b position-relative">
        <a
          href={`/users/${collection.author}/collections/${collection._id}/items`}
          className="stretched-link"
          aria-label="Open Collection"
        />
        <Col sm={12} md={3} className="py-3">
          <h3>
            {title}
            <br />
            <small className="text-muted">{category}</small>
          </h3>
        </Col>
        <Col sm={12} md={6} className="py-3 odd-col">{truncatedText}</Col>
        <Col sm={12} md={2} className="py-3 d-flex align-items-center">
          {imageUrl ? <img src={imageUrl} alt={title} /> : <p>No image provided</p>}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default Collection;
