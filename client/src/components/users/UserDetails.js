import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { id } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.users);
  const user = value.find((user) => user._id === id);

  return (
    <div>
      <h2>USER DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {user ? (
        <>
          <h3>{user._id}</h3>
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
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
