import { useSelector } from 'react-redux';
import PaginatedCollections from './PaginatedCollections';

const Collections = () => {
  const { value, isLoading, error } = useSelector((state) => state.collections);

  return (
    <div id="collections">
      <h3>COLLECTIONS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value?.length > 0 && <PaginatedCollections />}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any collections. Want to create one?</p>}
    </div>
  );
};

export default Collections;
