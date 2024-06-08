import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { BsChatLeft } from 'react-icons/bs';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLike, postLike } from '../../redux/likes/likesSlice';
import { postComment } from '../../redux/comments/commentsSlice';
import NewComment from '../comments/NewComment';
import Likes from '../likes/Likes';
import ClickOutside from '../../helpers/ClickOutside';

const Actions = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { value, error: likeFailed } = useSelector((state) => state.likes);
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
    <Container className="actions p-0">
      <Stack
        direction="horizontal"
        gap={4}
        className="p-1"
      >
        <Stack
          direction="horizontal"
        >
          <BsChatLeft
            color="white"
            className="me-4"
            onClick={() => setOpen(!open)}
            aria-controls="newcomment"
            aria-expanded={open}
          />
          <Likes
            handleLike={handleLike}
            currentLike={currentLike}
          />
        </Stack>
        {likeFailed && (
          <Alert
            data-bs-theme="dark"
            variant="danger"
            className="p-2 m-0"
          >
            {likeFailed}
          </Alert>
        )}
      </Stack>
      <ClickOutside onClick={() => setOpen(false)}>
        <Collapse in={open} className="mb-3">
          <Form onSubmit={comment} id="newcomment">
            <NewComment
              commentData={commentData}
              handleChange={(e) => setCommentData({ text: e.target.value })}
            />
          </Form>
        </Collapse>
      </ClickOutside>
    </Container>
  );
};

export default Actions;
