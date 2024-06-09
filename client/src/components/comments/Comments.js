import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const Comments = () => {
  const { value, isLoading } = useSelector((state) => state.comments);

  return (
    <>
      <ToastContainer
        className="comments p-3 green-bg w-100"
        data-bs-theme="dark"
      >
        <h4 className="text-light mb-2">Comments:</h4>
        {isLoading && (
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {value && value?.map((comment) => (
          <Comment
            comment={comment}
            key={uuidv4()}
          />
        ))}
        {value.length === 0 && (
          <Alert variant="success">
            This item has no comments. Be first to leave a comment!
          </Alert>
        )}
      </ToastContainer>
    </>
  );
};

export default Comments;
