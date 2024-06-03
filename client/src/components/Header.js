import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../redux/auth/authSlice';
import Searchbar from './Searchbar';
import Profile from './Profile';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const signout = () => {
    dispatch(logout());
    navigate('/auth');
  };
  useEffect(() => {
    if (!Cookies.get('profile')) {
      dispatch(logout());
    }
  }, [location, dispatch]);

  return (
    <Navbar className="border-bottom nav" expand="lg" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/">COLLECTIONS OF THINGS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Searchbar className="me-auto my-2 my-lg-0" />
          <Nav className="justify-content-end flex-grow-1">
            {user
              ? (
                <Nav.Link href={`${user.user.username}`}>
                  <Profile currentUser={user.user} signout={signout} />
                </Nav.Link>
              ) : <Nav.Link href="/auth">Login</Nav.Link>}
            {user?.user.role === 'Admin' && <Nav.Link href="/users">Admin</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
