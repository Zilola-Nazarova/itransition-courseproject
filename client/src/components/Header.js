import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Searchbar from './Searchbar';

const Header = () => (
  <header>
    <h1><Link to="/">MY CATALOGUE</Link></h1>
    <Navbar />
    <Searchbar />
  </header>
);

export default Header;
