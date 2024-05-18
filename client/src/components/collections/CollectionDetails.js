import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const CollectionDetails = () => {
  const { collId } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.collections);
  const collection = value.find((collection) => collection._id === collId);
  const {
    _id, title, text, category, image,
  } = collection;

  return (
    <div>
      <h3>COLLECTION DETAILS</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {collection ? (
        <>
          <h4>{_id}</h4>
          <h4>{title}</h4>
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
