import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const ItemDetails = () => {
  const { id } = useParams();
  const { value, isLoading, error } = useSelector((state) => state.items);
  const item = value.find((item) => item.id === Number(id));

  return (
    <div>
      <h2>ITEM DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {item ? (
        <>
          <h3>{item.name}</h3>
          <h4>{item.id}</h4>
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
