import { useSelector } from 'react-redux';

const CollectionDetails = () => {
  const { collection, isLoading, error } = useSelector((state) => state.collections);

  return (
    <div id="details">
      <h3>COLLECTION DETAILS</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <>
          <h4>{collection._id}</h4>
          <h4>{collection.title}</h4>
          <h4>{collection.text}</h4>
          <h4>{collection.category}</h4>
          {collection.image
            ? <img src={collection.image} alt={collection.title} />
            : <p>No image provided</p>}
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
