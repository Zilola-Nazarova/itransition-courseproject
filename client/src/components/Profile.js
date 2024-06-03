import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Profile = ({ currentUser, signout }) => {
  const initials = currentUser.username
    ? currentUser.username.charAt(0)
    : currentUser.family_name.charAt(0) + currentUser.given_name.charAt(0);
  const fullName = currentUser.username
    ? currentUser.username
    : currentUser.family_name + currentUser.given_name;
  return (
    <div className="d-flex align-items-center gap-3">
      <Link
        to={`/${currentUser.username}`}
        className="profile-card"
      >
        {currentUser.picture
          ? (
            <img
              src={currentUser.picture}
              alt={currentUser.name}
            />
          ) : (
            <div className="initials">
              <strong>{ initials }</strong>
            </div>
          )}
        <span className="text-center">
          {fullName}
        </span>
      </Link>
      <Button
        className="inline"
        variant="success"
        onClick={signout}
      >
        Sign Out
      </Button>
    </div>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.objectOf(String).isRequired,
  signout: PropTypes.func.isRequired,
};

export default Profile;
