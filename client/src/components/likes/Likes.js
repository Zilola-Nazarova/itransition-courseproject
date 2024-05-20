// import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLike, postLike } from '../../redux/likes/likesSlice';

const Likes = () => {
  const dispatch = useDispatch();
  const { value, isLoading, error } = useSelector((state) => state.likes);
  const { userId, collId, itemId } = useParams();
  const { user } = useSelector((state) => state.auth);
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

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value && (
        <>
          <h4>
            Likes:
            <span>{value?.length}</span>
          </h4>
          <h5>{ currentLike ? 'Liked' : 'Disliked' }</h5>
          <button
            type="button"
            onClick={handleLike}
          >
            { currentLike ? 'Dislike' : 'Like' }
          </button>
        </>
      )}
    </div>
  );
};

export default Likes;
