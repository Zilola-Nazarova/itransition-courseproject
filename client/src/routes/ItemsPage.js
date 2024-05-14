import { Link, Outlet, useLocation } from 'react-router-dom';
import Items from '../components/items/Items';

const ItemsPage = () => {
  const { pathname } = useLocation();
  return (
    <>
      <h3>ITEMS COMPONENT</h3>
      <Items />
      {pathname === '/items/form'
        ? <Link to="/items">Close</Link>
        : <Link to="form">Create Item</Link>}
      <Outlet />
    </>
  );
};

export default ItemsPage;
