import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { postUser } from '../../redux/users/usersSlice';
import Radio from './Radio';

const NewUser = () => {
  const dispatch = useDispatch();
  const emptyUserObj = {
    username: '',
    email: '',
    password: '',
    role: '',
    active: '',
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
    <>
      <h3>CREATE USER</h3>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="username"
          placeholder="username"
          value={userData.username}
          onChange={handleChange}
        />
        <input
          required
          name="email"
          placeholder="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          required
          name="password"
          placeholder="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Radio
          legend="Select a role:"
          options={roles}
          name="role"
          current={userData.role}
          handleChange={(e) => setUserData({ ...userData, role: e.target.value })}
        />
        <Radio
          legend="Is user active?"
          options={active}
          name="active"
          current={userData.active}
          handleChange={(e, bool) => setUserData({ ...userData, active: bool })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewUser;
