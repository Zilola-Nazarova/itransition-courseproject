import { Link } from 'react-router-dom';
import Items from '../components/items/Items';

const ItemsPage = () => (
  <>
    <Items />
    <Link to="form">Create Item</Link>
  </>
);

export default ItemsPage;
