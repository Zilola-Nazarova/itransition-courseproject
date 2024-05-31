import {
  Routes, Route, BrowserRouter, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import CollectionPage from './routes/CollectionPage';
import ItemPage from './routes/ItemPage';
import AdminPage from './routes/AdminPage';
import UserPage from './routes/UserPage';
import HomePage from './routes/HomePage';
import Layout from './routes/Layout';
import NotFound from './routes/NotFound';
import Auth from './components/auth/Auth';
import Results from './routes/Results';
import TagPage from './routes/TagPage';
import ProfilePage from './routes/ProfilePage';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route index element={<HomePage />} />
          <Route path="search" element={<Results />} />
          <Route path="tags/:tagId" element={<TagPage />} />
          <Route path="auth" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/:username" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
          <Route path="users">
            <Route index element={user?.user.role === 'Admin' ? <AdminPage /> : <NotFound />} />
            <Route path=":userId/collections">
              <Route index element={<UserPage />} />
              <Route path=":collId/items">
                <Route index element={<CollectionPage />} />
                <Route path=":itemId" element={<ItemPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
