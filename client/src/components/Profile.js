import PropTypes from 'prop-types';

const Profile = ({ currentUser, signout }) => (
  <>
    <span>My Profile</span>
    {currentUser.picture
      ? (
        <img
          src={currentUser.picture}
          alt={currentUser.name}
        />
      ) : (
        <span>
          {currentUser.family_name.charAt(0) + currentUser.given_name.charAt(0)}
        </span>
      )}
    <span>{currentUser.family_name}</span>
    <span>{currentUser.given_name}</span>
    <button
      type="button"
      onClick={signout}
    >
      Sign Out
    </button>
  </>
);

Profile.propTypes = {
  currentUser: PropTypes.arrayOf(String).isRequired,
  signout: PropTypes.func.isRequired,
};

export default Profile;
