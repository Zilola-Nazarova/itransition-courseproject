import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { getCollections } from './redux/collections/collectionsSlice';
import { getItems } from './redux/items/itemsSlice';

import CollectionsPage from './routes/CollectionsPage';
import ItemsPage from './routes/ItemsPage';
import HomePage from './routes/HomePage';
import Layout from './routes/Layout';
import NotFound from './routes/NotFound';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCollections());
    dispatch(getItems());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="items" element={<ItemsPage />} />        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
