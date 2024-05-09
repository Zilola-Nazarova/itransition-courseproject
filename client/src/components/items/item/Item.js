import PropTypes from 'prop-types';

const Item = ({ item }) => {
  const { id, name } = item;

  return (
    <div>
      <p>SINGLE ITEM</p>
      <p>{id}</p>
      <p>{name}</p>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Item;
