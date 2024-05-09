import PropTypes from 'prop-types';

const User = ({ user }) => {
  const { id, name } = user;
  return (
    <div>
      <p>SINGLE USER</p>
      <p>{id}</p>
      <p>{name}</p>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
