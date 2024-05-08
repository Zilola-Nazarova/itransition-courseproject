import PropTypes from 'prop-types';

const Item = ({ item }) => (
  <div>
    <p>SINGLE ITEM</p>
    <p>{item}</p>
  </div>
);

Item.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Item;
