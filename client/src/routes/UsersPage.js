import Container from 'react-bootstrap/Container';
import Users from '../components/users/Users';
import NewUser from '../components/users/NewUser';

const UsersPage = () => (
  <>
    <h2>USERS PAGE</h2>
    <Container id="form">
      <NewUser />
    </Container>
    <Container id="collections">
      <Users />
    </Container>
  </>
);

export default UsersPage;
