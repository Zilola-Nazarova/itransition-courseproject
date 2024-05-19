import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => (
  <header>
    <h1><Link to="/">MY CATALOGUE</Link></h1>
    <Navbar />
  </header>
);

export default Header;
