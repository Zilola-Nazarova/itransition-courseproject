import PropTypes from 'prop-types';
import Radio from '../Radio';

const UpdateUser = ({ userData, user, handleChange }) => {
  const roleOptions = ['User', 'Admin'];
  const activeOptions = [true, false];
  return (
    <>
      <input
        required
        placeholder={user.username}
        value={userData.username}
        onChange={(e) => handleChange({ ...userData, username: e.target.value })}
      />
      <input
        required
        placeholder={user.email}
        value={userData.email}
        onChange={(e) => handleChange({ ...userData, email: e.target.value })}
      />
      <input
        required
        placeholder="password"
        value={userData.password}
        onChange={(e) => handleChange({ ...userData, password: e.target.value })}
      />
      <Radio
        legend="Select a role:"
        options={roleOptions}
        name="role"
        current={userData.role}
        handleChange={(e) => handleChange({ ...userData, role: e.target.value })}
      />
      <Radio
        legend="Is user active?"
        options={activeOptions}
        name="active"
        current={userData.active}
        handleChange={(e, bool) => handleChange({ ...userData, active: bool })}
      />
    </>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default UpdateUser;
