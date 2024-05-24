import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UpdateCollection from './UpdateCollection';
import { updateCollection, deleteCollection } from '../../../redux/collections/collectionsSlice';

const Collection = ({ collection }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const {
    _id, title, text, category, image,
  } = collection;
  const [collectionData, setCollectionData] = useState(collection);
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateCollection({ userId, collId: _id, updatedCollection: collectionData }));
    setOnEdit(false);
  };

  return (
    <div className="collection">
      <p>SINGLE COLLECTION</p>
      {onEdit ? (
        <>
          <UpdateCollection
            collectionData={collectionData}
            collection={collection}
            handleChange={(data) => setCollectionData(data)}
          />
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link to={`/users/${collection.author}/collections/${collection._id}/items`}>
            <p>{_id}</p>
            <p>{title}</p>
            <p>{text}</p>
            <p>{category}</p>
            {image ? <img src={image} alt={title} /> : <p>No image provided</p>}
          </Link>
          <button type="button" onClick={() => setOnEdit(true)}>Edit</button>
        </>
      )}
      <button type="button" onClick={() => dispatch(deleteCollection({ userId, collId: _id }))}>Delete</button>
    </div>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Collection;
