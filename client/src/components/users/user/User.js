import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  const { id, name } = user;
  return (
    <Link to={`${user.id}`}>
      <div>
        <p>SINGLE USER</p>
        <p>{id}</p>
        <p>{name}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
