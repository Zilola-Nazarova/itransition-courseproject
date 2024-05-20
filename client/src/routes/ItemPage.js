import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import ItemDetails from '../components/items/ItemDetails';
import Likes from '../components/likes/Likes';
import Comments from '../components/comments/Comments';
import { getItem } from '../redux/items/itemsSlice';
import { getComments } from '../redux/comments/commentsSlice';
import { getLikes } from '../redux/likes/likesSlice';

const ItemPage = () => {
  const dispatch = useDispatch();
  const { userId, collId, itemId } = useParams();

  useEffect(() => {
    dispatch(getLikes({ userId, collId, itemId }));
    dispatch(getComments({ userId, collId, itemId }));
    dispatch(getItem({ userId, collId, itemId }));
  }, [dispatch, collId, userId, itemId]);

  return (
    <>
      <ItemDetails />
      <Likes />
      <Comments />
    </>
  );
};

export default ItemPage;
