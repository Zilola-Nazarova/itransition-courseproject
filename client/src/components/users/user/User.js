import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUser, deleteUser } from '../../../redux/users/usersSlice';
import UpdateUser from './UpdateUser';
import EditDelete from '../../EditDelete';

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
    <Row className="user">
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
          <a
            href={`${user._id}/collections`}
            className="stretched-link"
            aria-label="Open Collection"
          />
          <Col>{_id}</Col>
          <Col>{username}</Col>
          <Col>{email}</Col>
          <Col>{password}</Col>
          <Col>{role}</Col>
          <Col>{`${active}`}</Col>
          <EditDelete
            edit={() => setOnEdit(true)}
            del={() => dispatch(deleteUser(_id))}
          />
        </>
      )}
    </Row>
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
