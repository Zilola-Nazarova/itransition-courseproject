import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Collection from './collection/Collection';

const Collections = () => {
  const { value, isLoading, error } = useSelector((state) => state.collections);

  return (
    <div id="collections">
      <h3>COLLECTIONS COMPONENT</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {value?.length > 0 && value.map((collection) => (
        <Collection key={uuidv4()} collection={collection} />
      ))}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any collections. Want to create one?</p>}
    </div>
  );
};

export default Collections;
