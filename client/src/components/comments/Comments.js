import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Badge from 'react-bootstrap/Badge';
import { FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../redux/comments/commentsSlice';

const Comments = () => {
  const dispatch = useDispatch();
  const { userId, collId, itemId } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  const removeComment = (id) => {
    dispatch(deleteComment({
      userId, collId, itemId, commentId: id,
    }));
  };
  return (
    <div>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {value && (
        <>
          <h4>Comments:</h4>
          {value?.map((comment) => (
            <Toast key={uuidv4()}>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">{comment.author}</strong>
                <small>{new Date(comment.createdAt).toDateString()}</small>
              </Toast.Header>
              <Toast.Body>
                {comment.text}
                {(user.user._id === comment.author || user.user.role === 'Admin') && (
                  <Badge bg="secondary">
                    <FaTrash onClick={() => removeComment(comment._id)} />
                  </Badge>
                )}
              </Toast.Body>
            </Toast>
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
