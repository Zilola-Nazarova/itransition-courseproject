import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

const ItemDetails = () => {
  const { item, isLoading, error } = useSelector((state) => state.items);
  const { userId, collId } = useParams();

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {item ? (
        <>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <div className="tags">
            {item.tags.map((tag) => (
              <Link to={`/tags/${tag._id}`} key={uuidv4()}>
                {`#${tag.tagname} `}
              </Link>
            ))}
          </div>
          <a
            href={`/users/${userId}/collections/${collId}/items/${item._id}`}
            className="stretched-link"
            aria-label="Open Collection"
          />
        </>
      ) : (
        <p>
          Oops! Seems this item doesn&apos;t exist.
          <br />
          Go back to Items Page.
        </p>
      )}
    </>
  );
};
export default ItemDetails;
