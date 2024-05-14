import { Link, Outlet, useLocation } from 'react-router-dom';
import Collections from '../components/collections/Collections';

const CollectionsPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <h3>COLLECTIONS COMPONENT</h3>
      <Collections />
      {pathname === '/collections/form'
        ? <Link to="/collections">Close</Link>
        : <Link to="form">Create Collection</Link>}
      <Outlet />
    </>
  );
};

export default CollectionsPage;
