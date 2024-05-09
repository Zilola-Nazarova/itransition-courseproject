import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Item = ({ item }) => {
  const { id, name } = item;

  return (
    <Link to={`${item.id}`}>
      <div>
        <p>SINGLE ITEM</p>
        <p>{id}</p>
        <p>{name}</p>
      </div>
    </Link>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
