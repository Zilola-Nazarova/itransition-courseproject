import Container from 'react-bootstrap/esm/Container';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Support from '../components/support/Support';

const Layout = () => (
  <>
    <Header />
    <Container
      fluid
      className="outlet bg-dark p-5"
    >
      <Outlet />
    </Container>
    <Support />
  </>
);

export default Layout;
