import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Collection = ({ collection }) => {
  const { id, name } = collection;

  return (
    <Link to={`${collection.id}`}>
      <div>
        <p>SINGLE COLLECTION</p>
        <p>{id}</p>
        <p>{name}</p>
      </div>
    </Link>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Collection;
