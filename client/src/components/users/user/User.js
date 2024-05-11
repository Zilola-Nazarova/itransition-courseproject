import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateUser, deleteUser } from '../../../redux/users/usersSlice';

const User = ({ user }) => {
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const { _id, name, email } = user;
  const [userData, setUserData] = useState({ _id, name, email });
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    setOnEdit(false);
  };
  const updateForm = (
    <>
      <input
        placeholder={name}
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        placeholder={email}
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
    </>
  );

  return (
    <div>
      <p>SINGLE USER</p>
      {onEdit ? (
        <>
          {updateForm}
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link to={`${user._id}`}>
            <p>{name}</p>
            <p>{email}</p>
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
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
