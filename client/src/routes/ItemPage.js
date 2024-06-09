import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import ItemDetails from '../components/items/ItemDetails';
import Actions from '../components/items/Actions';
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
    <Container
      className="width-limit"
      data-bs-theme="dark"
    >
      <h1 className="text-light mb-4">ITEM</h1>
      <ItemDetails />
      <Actions />
      <Comments />
    </Container>
  );
};

export default ItemPage;
