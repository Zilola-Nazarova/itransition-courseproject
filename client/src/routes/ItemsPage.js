// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
// import { getItems } from '../redux/items/itemsSlice';
import Items from '../components/items/Items';

const ItemsPage = () => {
  // const dispatch = useDispatch();
  const { pathname } = useLocation();

  // useEffect(() => {
  //   dispatch(getItems());
  // }, [dispatch]);

  return (
    <>
      <h2>ITEMS PAGE</h2>
      <Items />
      {pathname === '/items/form'
        ? <Link to="/items">Close</Link>
        : <Link to="form">Create Item</Link>}
      <Outlet />
    </>
  );
};

export default ItemsPage;
