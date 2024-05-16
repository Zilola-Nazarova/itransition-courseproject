import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { logout } from '../redux/auth/authSlice';
import Profile from './Profile';

const Navbar = () => {
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
    <nav>
      <div>
        {user
          ? <Profile currentUser={user.user} signout={signout} />
          : <Link to="auth">Login</Link>}
      </div>
      <Link to="users">Users</Link>
      <Link to="items">Items</Link>
      <Link to="collections">Collections</Link>
    </nav>
  );
};

export default Navbar;
