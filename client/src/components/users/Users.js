import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination';
import User from './user/User';

const Users = () => {
  const { value, isLoading, error } = useSelector((state) => state.users);

  return (
    <div id="users">
      <h3>USERS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value?.length > 0 && (
        <Pagination
          items={value}
          itemsPerPage={3}
          renderItem={(item) => <User user={item} key={uuidv4()} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you there are no users registered. Want to create one?</p>}
    </div>
  );
};

export default Users;
