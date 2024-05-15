import PropTypes from 'prop-types';

const Profile = ({ currentUser, signout }) => {
  const initials = currentUser.username
    ? currentUser.username.charAt(0)
    : currentUser.family_name.charAt(0) + currentUser.given_name.charAt(0);
  const fullName = currentUser.username
    ? currentUser.username
    : currentUser.family_name + currentUser.given_name;
  return (
    <>
      <span>My Profile</span>
      {currentUser.picture
        ? (
          <img
            src={currentUser.picture}
            alt={currentUser.name}
          />
        ) : (
          <span>{ initials }</span>
        )}
      {fullName}
      <button
        type="button"
        onClick={signout}
      >
        Sign Out
      </button>
    </>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.objectOf(String).isRequired,
  signout: PropTypes.func.isRequired,
};

export default Profile;
