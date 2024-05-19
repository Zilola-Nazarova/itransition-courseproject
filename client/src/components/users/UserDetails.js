import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { user, isLoading, error } = useSelector((state) => state.users);

  return (
    <div id="details">
      <h3>USER DETAILS</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {user ? (
        <>
          <h4>{user._id}</h4>
          <h4>{user.username}</h4>
          <h4>{user.email}</h4>
          <h4>{user.password}</h4>
          <h4>{user.role}</h4>
          <h4>{user.active}</h4>
        </>
      ) : (
        <p>
          Oops! Seems this user doesn&apos;t exist.
          <br />
          Go back to Users Page.
        </p>
      )}
    </div>
  );
};

export default UserDetails;
