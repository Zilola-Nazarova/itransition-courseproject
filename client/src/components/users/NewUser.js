import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/users/usersSlice';

const NewUser = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    id: '',
    name: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(userData));
  };
  const clear = () => {
    setUserData({
      id: '',
      name: '',
    });
  };

  return (
    <>
      <h3>CREATE USER</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="number"
          placeholder="5"
          label="id"
          value={userData.id}
          onChange={(e) => setUserData({ ...userData, id: e.target.valueAsNumber })}
        />
        <input
          name="name"
          placeholder="User #5"
          label="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewUser;
