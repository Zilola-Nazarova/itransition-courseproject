import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../redux/comments/commentsSlice';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { userId, collId, itemId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const removeComment = () => {
    dispatch(deleteComment({
      userId, collId, itemId, commentId: comment._id,
    }));
  };

  return (
    <Toast className="comment">
      <Toast.Header closeButton={false}>
        <div
          className="avatar rounded me-2 bg-success"
        />
        <strong className="me-auto">{comment.author.username}</strong>
        <small>{new Date(comment.createdAt).toDateString()}</small>
      </Toast.Header>
      <Toast.Body className="text-light">
        {comment.text}
        {(user?.user._id === comment.author._id || user?.user.role === 'Admin') && (
          <Button
            variant="danger"
            onClick={removeComment}
          >
            <FaTrash />
          </Button>
        )}
      </Toast.Body>
    </Toast>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.objectOf(String).isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
