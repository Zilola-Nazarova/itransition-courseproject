import { Link, Outlet } from 'react-router-dom';
import Collections from '../components/collections/Collections';

const CollectionsPage = () => (
  <>
    <Collections />
    <Link to="form">Create Collection</Link>
    <Outlet />
  </>
);

export default CollectionsPage;
