import PropTypes from 'prop-types';

const Collection = ({ collection }) => (
  <div>
    <p>SINGLE COLLECTION</p>
    <p>{collection}</p>
  </div>
);

Collection.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default Collection;
