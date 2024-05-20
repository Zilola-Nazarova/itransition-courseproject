import { useState } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, postComment } from '../../redux/comments/commentsSlice';

const Comments = () => {
  const dispatch = useDispatch();
  const { userId, collId, itemId } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.comments);
  const [commentData, setCommentData] = useState({ text: '' });
  const clear = () => setCommentData({ text: '' });
  const comment = (e) => {
    e.preventDefault();
    dispatch(postComment({
      userId, collId, itemId, newComment: commentData,
    }));
    clear();
  };
  const removeComment = (id) => {
    dispatch(deleteComment({
      userId, collId, itemId, commentId: id,
    }));
  };
  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value && (
        <>
          <h4>Comments:</h4>
          {value?.map((comment) => (
            <li key={uuidv4()}>
              <p>{comment.text}</p>
              <button type="button" onClick={() => removeComment(comment._id)}>Delete</button>
            </li>
          ))}
          <form onSubmit={comment}>
            <textarea
              value={commentData.text}
              onChange={(e) => setCommentData({ text: e.target.value })}
            />
            <button type="submit">Comment</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Comments;
