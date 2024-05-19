import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import ItemDetails from '../components/items/ItemDetails';
import { getItem } from '../redux/items/itemsSlice';

const ItemPage = () => {
  const dispatch = useDispatch();
  const { userId, collId, itemId } = useParams();

  useEffect(() => {
    dispatch(getItem({ userId, collId, itemId }));
  }, [dispatch, collId, userId, itemId]);

  return (
    <ItemDetails />
  );
};

export default ItemPage;
