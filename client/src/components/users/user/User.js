import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  const { name, email } = user;
  return (
    <Link to={`${user._id}`}>
      <div>
        <p>SINGLE USER</p>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
