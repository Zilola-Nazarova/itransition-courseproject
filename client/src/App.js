import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
import Auth from './components/auth/Auth';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<HomePage />} />
        <Route path="auth" element={<Auth />} />
        <Route path="users">
          <Route index element={<UsersPage />} />
          <Route path="form" element={<NewUser />} />
          <Route path=":userId/collections">
            <Route index element={<UserPage />} />
            <Route path="form" element={<NewCollection />} />
            <Route path=":collId/items">
              <Route index element={<CollectionPage />} />
              <Route path="form" element={<NewItem />} />
              <Route path=":itemId" element={<ItemPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
