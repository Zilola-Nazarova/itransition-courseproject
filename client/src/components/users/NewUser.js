import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { postUser } from '../../redux/users/usersSlice';
import Radio from './Radio';
import CreateClear from '../CreateClear';

const NewUser = () => {
  const dispatch = useDispatch();
  const emptyUserObj = {
    username: '', email: '', password: '', role: null, active: '',
  };
  const [userData, setUserData] = useState(emptyUserObj);
  const clear = () => setUserData(emptyUserObj);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(userData));
    clear();
  };
  const roles = ['User', 'Admin'];
  const active = [true, false];

  return (
    <Accordion data-bs-theme="dark">
      <Accordion.Item eventKey="0">
        <Accordion.Header>CREATE USER</Accordion.Header>
        <Accordion.Body>
          <Form
            className="text-start m-auto d-grid gap-3"
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter username"
                value={userData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                placeholder="Enter email"
                value={userData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                placeholder="Enter password"
                value={userData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Radio
              legend="Select a role:"
              options={roles}
              current={userData.role}
              handleChange={(e) => setUserData({ ...userData, role: e.target.value })}
            />
            <Radio
              legend="Is user active?"
              options={active}
              current={userData.active}
              handleChange={(e, bool) => setUserData({ ...userData, active: bool })}
            />
            <CreateClear clear={clear} />
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default NewUser;
