import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Collections from '../components/collections/Collections';

const CollectionsPage = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <Collections />
      {openForm
        ? <Link to="/collections" onClick={() => setOpenForm(false)}>Close</Link>
        : <Link to="form" onClick={() => setOpenForm(true)}>Create Collection</Link>}
      <Outlet />
    </>
  );
};

export default CollectionsPage;
