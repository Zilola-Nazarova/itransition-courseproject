import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const CollectionDetails = () => {
  const { id } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.collections);
  const collection = value.find((collection) => collection._id === id);
  const {
    _id, title, text, category, image,
  } = collection;

  return (
    <div>
      <h2>COLLECTION DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <>
          <h3>{_id}</h3>
          <h3>{title}</h3>
          <h4>{text}</h4>
          <h4>{category}</h4>
          {image ? <img src={image} alt={title} /> : <p>No image provided</p>}
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
