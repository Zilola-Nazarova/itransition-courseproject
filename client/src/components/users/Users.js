import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Paginated from '../Paginated';
import User from './user/User';
import { getUsers } from '../../redux/users/usersSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Users = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const page = query.get('page') || '1';
  useEffect(() => {
    if (page) {
      dispatch(getUsers(page));
    }
  }, [dispatch, page]);
  const {
    value, numberOfPages, isLoading, error,
  } = useSelector((state) => state.users);

  return (
    <>
      <h3>USERS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value?.length > 0 && (
        <Paginated
          pageCount={numberOfPages}
          page={page}
          items={value}
          renderItem={(item) => <User user={item} key={uuidv4()} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you there are no users registered. Want to create one?</p>}
    </>
  );
};

export default Users;
