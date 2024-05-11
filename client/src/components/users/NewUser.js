import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/users/usersSlice';

const NewUser = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const clear = () => {
    setUserData({
      name: '',
      email: '',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUser(userData));
    clear();
  };

  return (
    <>
      <h3>CREATE USER</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          label="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          name="email"
          placeholder="email"
          label="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewUser;
