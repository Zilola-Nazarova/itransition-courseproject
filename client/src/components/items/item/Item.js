import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Item = ({ item }) => {
  const { title, description } = item;

  return (
    <Link to={`${item._id}`}>
      <div>
        <p>SINGLE ITEM</p>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
