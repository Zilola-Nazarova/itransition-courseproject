import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { user, isLoading, error } = useSelector((state) => state.users);

  return (
    <>
      {error === 'User not found' && (
        <Alert variant="danger">
          Oops! Seems this user doesn&apos;t exist.
          <br />
          Go back to Users Page.
        </Alert>
      )}
      {error && error !== 'User not found' && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {user && (
        <Card border="success" data-bs-theme="dark">
          <Card.Header>AUTHOR</Card.Header>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {`Since ${new Date(user.createdAt).toDateString()}`}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {/* to change later */}
              {`Last seen ${new Date(user.createdAt).toDateString()}`}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default UserDetails;
