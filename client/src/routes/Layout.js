import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => (
  <>
    <Header />
    <div>
      <Outlet />
    </div>
  </>
);

export default Layout;
