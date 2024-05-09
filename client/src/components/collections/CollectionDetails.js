import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const CollectionDetails = () => {
  const { id } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.collections);
  const collection = value.find((collection) => collection.id === Number(id));

  return (
    <div>
      <h2>COLLECTION DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <>
          <h3>{collection.name}</h3>
          <h4>{collection.id}</h4>
        </>
      ) : (
        <p>
          Oops! Seems this collection doesn&apos;t exist.
          <br />
          Go back to Collections Page.
        </p>
      )}
    </div>
  );
};

export default CollectionDetails;
