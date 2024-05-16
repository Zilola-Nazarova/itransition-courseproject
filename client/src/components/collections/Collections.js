import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Collection from './collection/Collection';

const Collections = () => {
  const { value, isLoading, error } = useSelector((state) => state.collections);
  if (error) {
    return <p>{error}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {value.length > 0 ? value.map((collection) => (
        <Collection key={uuidv4()} collection={collection} />
      )) : <p>Oops! Seems you don&apos;t have any collections. Want to create one?</p>}
    </div>
  );
};

export default Collections;
