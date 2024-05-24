import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CollectionPage from './routes/CollectionPage';
import ItemPage from './routes/ItemPage';
import UsersPage from './routes/UsersPage';
import UserPage from './routes/UserPage';
import HomePage from './routes/HomePage';
import Layout from './routes/Layout';
import NotFound from './routes/NotFound';
import Auth from './components/auth/Auth';
import TagPage from './routes/TagPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<HomePage />} />
        <Route path="tags/:tagId" element={<TagPage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="users">
          <Route index element={<UsersPage />} />
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

export default App;
