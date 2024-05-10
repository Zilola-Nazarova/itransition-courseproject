import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { id } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.users);
  const user = value.find((user) => user.id === Number(id));

  return (
    <div>
      <h2>USER DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {user ? (
        <>
          <h3>{user.name}</h3>
          <h4>{user.id}</h4>
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
