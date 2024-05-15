import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import Profile from './Profile';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isAuthenticating, error } = useSelector((state) => state.auth);
  const signout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav>
      <div>
        {isAuthenticating && <span>Logging In</span>}
        {error && <span>{error}</span>}
        {currentUser
          ? <Profile currentUser={currentUser} signout={signout} />
          : <Link to="auth">Login</Link>}
      </div>
      <Link to="users">Users</Link>
      <Link to="items">Items</Link>
      <Link to="collections">Collections</Link>
    </nav>
  );
};

export default Navbar;
