import Container from 'react-bootstrap/esm/Container';

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => (
  <>
    <Header />
    <Container
      fluid
      className="outlet bg-dark p-5 m-auto"
    >
      <Outlet />
    </Container>
  </>
);

export default Layout;
