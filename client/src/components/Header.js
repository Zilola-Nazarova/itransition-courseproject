import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => (
  <header>
    <Link to="/">MY CATALOGUE</Link>
    <Navbar />
  </header>
);

export default Header;
