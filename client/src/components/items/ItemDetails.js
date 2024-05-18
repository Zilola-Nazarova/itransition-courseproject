import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const ItemDetails = () => {
  const { itemId } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.items);
  const item = value.find((item) => item._id === itemId);

  return (
    <div>
      <h2>ITEM DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {item ? (
        <>
          <h4>{item._id}</h4>
          <h4>{item.title}</h4>
          <h4>{item.text}</h4>
        </>
      ) : (
        <p>
          Oops! Seems this item doesn&apos;t exist.
          <br />
          Go back to Items Page.
        </p>
      )}
    </div>
  );
};
export default ItemDetails;
