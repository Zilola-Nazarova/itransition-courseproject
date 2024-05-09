import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import { getUsers } from './redux/users/usersSlice';
// import { getCollections } from './redux/collections/collectionsSlice';
// import { getItems } from './redux/items/itemsSlice';

import CollectionsPage from './routes/CollectionsPage';
import CollectionPage from './routes/CollectionPage';
import NewCollection from './components/collections/NewCollection';
import ItemsPage from './routes/ItemsPage';
import ItemPage from './routes/ItemPage';
import NewItem from './components/items/NewItem';
import UsersPage from './routes/UsersPage';
import UserPage from './routes/UserPage';
import NewUser from './components/users/NewUser';
import HomePage from './routes/HomePage';
import Layout from './routes/Layout';
import NotFound from './routes/NotFound';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUsers());
    // dispatch(getCollections());
    // dispatch(getItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserPage />} />
          <Route path="users/form" element={<NewUser />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="collections/:id" element={<CollectionPage />} />
          <Route path="collections/form" element={<NewCollection />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="items/:id" element={<ItemPage />} />
          <Route path="items/form" element={<NewItem />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
