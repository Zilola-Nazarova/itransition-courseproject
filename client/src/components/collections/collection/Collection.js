import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Collection = ({ collection }) => {
  const { title, description } = collection;

  return (
    <Link to={`${collection._id}`}>
      <div>
        <p>SINGLE COLLECTION</p>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Collection;
