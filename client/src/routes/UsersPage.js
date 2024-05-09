import { Link } from 'react-router-dom';
import Users from '../components/users/Users';

const UsersPage = () => (
  <>
    <Users />
    <Link to="form">Create User</Link>
  </>
);

export default UsersPage;
