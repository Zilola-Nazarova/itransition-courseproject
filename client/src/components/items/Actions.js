import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLike, postLike } from '../../redux/likes/likesSlice';
import { postComment } from '../../redux/comments/commentsSlice';
import NewComment from '../comments/NewComment';
import Likes from '../likes/Likes';

const Actions = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const toggleShowForm = () => setShowForm(!showForm);
  const { value, error } = useSelector((state) => state.likes);
  const { userId, collId, itemId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [commentData, setCommentData] = useState({ text: '' });
  const clear = () => setCommentData({ text: '' });
  const currentLike = value?.find(
    ({ item, author }) => item === itemId && author === user?.user._id,
  );
  const handleLike = (e) => {
    e.preventDefault();
    dispatch(currentLike
      ? deleteLike({
        userId, collId, itemId, likeId: currentLike._id,
      })
      : postLike({ userId, collId, itemId }));
  };
  const comment = (e) => {
    e.preventDefault();
    dispatch(postComment({
      userId, collId, itemId, newComment: commentData,
    }));
    clear();
  };

  return (
    <div>
      {error && (
        <Alert data-bs-theme="dark" variant="danger">
          {error}
        </Alert>
      )}
      <Stack direction="horizontal" bg="success">
        <Likes handleLike={handleLike} currentLike={currentLike} />
        <FaRegCommentAlt color="white" onClick={toggleShowForm} />
      </Stack>
      <Toast show={showForm} onClose={toggleShowForm}>
        <NewComment
          submit={comment}
          commentData={commentData}
          handleChange={(e) => setCommentData({ text: e.target.value })}
        />
      </Toast>
    </div>
  );
};

export default Actions;
