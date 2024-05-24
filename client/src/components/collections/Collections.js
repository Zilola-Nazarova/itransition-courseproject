import { useSelector } from 'react-redux';
import Pagination from '../Pagination';
import Collection from './collection/Collection';

const Collections = () => {
  const { value, isLoading, error } = useSelector((state) => state.collections);

  return (
    <div id="collections">
      <h3>COLLECTIONS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value?.length > 0 && (
        <Pagination
          items={value}
          itemsPerPage={3}
          renderItem={(item) => <Collection collection={item} />}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any collections. Want to create one?</p>}
    </div>
  );
};

export default Collections;
