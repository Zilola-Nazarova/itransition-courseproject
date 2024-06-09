import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Users from '../components/users/Users';
import NewUser from '../components/users/NewUser';

const AdminPage = () => (
  <>
    <h2>ADMIN PAGE</h2>
    <Row>
      <Col xs={12} lg={4}>
        <NewUser />
      </Col>
      <Col>
        <Users />
      </Col>
    </Row>
  </>
);

export default AdminPage;
