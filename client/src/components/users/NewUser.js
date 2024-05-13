import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { postUser } from '../../redux/users/usersSlice';

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
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
        <input
          required
          name="email"
          placeholder="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          required
          placeholder="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <fieldset>
          <legend>Select a role:</legend>
          {roles.map((role) => (
            <label key={uuidv4()} htmlFor={role}>
              <input
                checked={userData.role === role}
                type="radio"
                name="role"
                value={role}
                id={role}
                required
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              />
              {role}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Is user active?</legend>
          {active.map((bool) => (
            <label key={uuidv4()} htmlFor={`${bool}`}>
              <input
                checked={userData.active === bool}
                type="radio"
                name="active"
                value={bool}
                id={`${bool}`}
                required
                onChange={() => setUserData({ ...userData, active: bool })}
              />
              {`${bool}`}
            </label>
          ))}
        </fieldset>
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewUser;
