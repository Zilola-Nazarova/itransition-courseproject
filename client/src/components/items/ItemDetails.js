import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const ItemDetails = () => {
  const { item, isLoading, error } = useSelector((state) => state.items);

  return (
    <div id="details">
      <h2>ITEM DETAILS</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {item ? (
        <>
          <h4>{item._id}</h4>
          <h4>{item.title}</h4>
          <h4>{item.text}</h4>
          {item.tags.map((tag) => <span key={uuidv4()}>{tag.tagname}</span>)}
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
