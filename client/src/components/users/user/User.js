import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateUser, deleteUser } from '../../../redux/users/usersSlice';
import Radio from '../Radio';

const User = ({ user }) => {
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const {
    _id, username, email, password, role, active,
  } = user;
  const [userData, setUserData] = useState({ ...user, password: '' });
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId: _id, updatedUser: userData }));
    setOnEdit(false);
  };
  const roleOptions = ['User', 'Admin'];
  const activeOptions = [true, false];
  const updateForm = (
    <>
      <input
        required
        placeholder={username}
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        required
        placeholder={email}
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        required
        placeholder="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Radio
        legend="Select a role:"
        options={roleOptions}
        name="role"
        current={userData.role}
        handleChange={(e) => setUserData({ ...userData, role: e.target.value })}
      />
      <Radio
        legend="Is user active?"
        options={activeOptions}
        name="active"
        current={userData.active}
        handleChange={(e, bool) => setUserData({ ...userData, active: bool })}
      />
    </>
  );

  return (
    <div className="user">
      <p>SINGLE USER</p>
      {onEdit ? (
        <>
          {updateForm}
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link to={`${user._id}/collections`}>
            <p>{_id}</p>
            <p>{username}</p>
            <p>{email}</p>
            <p>{password}</p>
            <p>{role}</p>
            <p>{`${active}`}</p>
          </Link>
          <button type="button" onClick={() => setOnEdit(true)}>Edit</button>
        </>
      )}
      <button type="button" onClick={() => dispatch(deleteUser(_id))}>Delete</button>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};

export default User;
