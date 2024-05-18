import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Items from '../components/items/Items';
import { getCollectionItems } from '../redux/items/itemsSlice';
import CollectionDetails from '../components/collections/CollectionDetails';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const { userId, collId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('GETTING COLLECTION ITEMS');
    dispatch(getCollectionItems({ userId, collId }));
  }, [dispatch, collId, userId]);

  return (
    <>
      <h2>COLLECTION ITEMS PAGE</h2>
      <CollectionDetails />
      <Items />
      {pathname === `/users/${userId}/collections/${collId}/items/form`
        ? <Link to={`/users/${userId}/collections/${collId}/items`}>Close</Link>
        : <Link to="form">Create Item</Link>}
      <Outlet />
    </>
  );
};

export default CollectionPage;
