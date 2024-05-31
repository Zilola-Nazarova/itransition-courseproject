import Container from 'react-bootstrap/esm/Container';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => (
  <>
    <Header />
    <Container fluid className="bg-dark p-5">
      <Outlet />
    </Container>
  </>
);

export default Layout;
