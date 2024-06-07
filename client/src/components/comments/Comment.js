import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../../redux/comments/commentsSlice';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { userId, collId, itemId } = useParams();
  const [commentData, setCommentData] = useState(comment);
  const [onEdit, setOnEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.comments);
  const removeComment = () => {
    dispatch(deleteComment({
      userId, collId, itemId, commentId: comment._id,
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateComment({
      userId, collId, itemId, commentId: comment._id, updatedComment: commentData,
    }));
    setOnEdit(false);
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
        {onEdit
          ? (
            <textarea
              value={commentData.text}
              onChange={(e) => setCommentData({ ...commentData, text: e.target.value })}
            />
          ) : comment.text}
        {(user?.user._id === comment.author._id || user?.user.role === 'Admin') && (
          <Stack
            direction="horizontal"
            gap={2}
          >
            {error && (
              <Alert variant="danger" className="p-2 m-0">
                {error}
              </Alert>
            )}
            {onEdit ? (
              <>
                <Button
                  className="ms-auto"
                  variant="secondary"
                  onClick={() => setOnEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="ms-auto"
                  variant="secondary"
                  onClick={() => setOnEdit(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={removeComment}
                >
                  <FaTrash />
                </Button>
              </>
            )}
          </Stack>
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
