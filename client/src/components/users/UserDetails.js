import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const { user, isLoading, error } = useSelector((state) => state.users);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {user ? (
        <Link to={`/users/${user._id}/collections`}>
          <h3>{user.username}</h3>
          <h4>{user.email}</h4>
        </Link>
      ) : (
        <p>
          Oops! Seems this user doesn&apos;t exist.
          <br />
          Go back to Users Page.
        </p>
      )}
    </>
  );
};

export default UserDetails;
