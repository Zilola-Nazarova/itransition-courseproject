import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { user, isLoading, error } = useSelector((state) => state.users);

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {user ? (
        <Card border="success" data-bs-theme="dark">
          <Card.Header>AUTHOR</Card.Header>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {`Since ${new Date(user.createdAt).toDateString()}`}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {`Last seen ${new Date(user.createdAt).toDateString()}`}
            </Card.Subtitle>
          </Card.Body>
        </Card>
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
