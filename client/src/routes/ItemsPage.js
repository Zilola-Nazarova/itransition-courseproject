import { Link, Outlet } from 'react-router-dom';
import Items from '../components/items/Items';

const ItemsPage = () => (
  <>
    <Items />
    <Link to="form">Create Item</Link>
    <Outlet />
  </>
);

export default ItemsPage;
