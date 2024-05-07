import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Collection from './collection/Collection';

const Collections = () => {
  const collections = useSelector((state) => state.collections.value);

  return (
    <div>
      <h3>COLLECTIONS COMPONENT</h3>
      {collections.map((collection) => (
        <Collection key={uuidv4()} collection={collection} />
      ))}
    </div>
  );
};

export default Collections;
