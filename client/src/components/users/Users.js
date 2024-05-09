import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import User from './user/User';

const Users = () => {
  const { value, isLoading, error } = useSelector((state) => state.users);

  return (
    <div>
      <h3>USERS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value.length > 0 ? value.map((user) => (
        <User key={uuidv4()} user={user} />
      )) : <p>Oops! Seems you there are no users registered. Want to create one?</p>}
    </div>
  );
};

export default Users;