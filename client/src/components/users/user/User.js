import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateUser, deleteUser } from '../../../redux/users/usersSlice';
import UpdateUser from './UpdateUser';

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

  return (
    <div className="user">
      <p>SINGLE USER</p>
      {onEdit ? (
        <>
          <UpdateUser
            userData={userData}
            user={user}
            handleChange={(data) => setUserData(data)}
          />
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
