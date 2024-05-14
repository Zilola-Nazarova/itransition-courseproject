import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Items from '../components/items/Items';

const ItemsPage = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <h3>ITEMS COMPONENT</h3>
      <Items />
      {openForm
        ? <Link to="/items" onClick={() => setOpenForm(false)}>Close</Link>
        : <Link to="form" onClick={() => setOpenForm(true)}>Create Item</Link>}
      <Outlet />
    </>
  );
};

export default ItemsPage;
