import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getCollections } from '../redux/collections/collectionsSlice';
import Collections from '../components/collections/Collections';

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getCollections());
  }, [dispatch]);

  return (
    <>
      <h2>COLLECTIONS PAGE</h2>
      <Collections />
      {pathname === '/collections/form'
        ? <Link to="/collections">Close</Link>
        : <Link to="form">Create Collection</Link>}
      <Outlet />
    </>
  );
};

export default CollectionsPage;
