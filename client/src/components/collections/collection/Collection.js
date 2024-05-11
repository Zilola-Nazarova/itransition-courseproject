import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateCollection } from '../../../redux/collections/collectionsSlice';

const Collection = ({ collection }) => {
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const { _id, title, description } = collection;
  const [collectionData, setCollectionData] = useState({ _id, title, description });
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateCollection(collectionData));
    setOnEdit(false);
  };
  const updateForm = (
    <>
      <input
        placeholder={title}
        value={collectionData.title}
        onChange={(e) => setCollectionData({ ...collectionData, title: e.target.value })}
      />
      <input
        placeholder={description}
        value={collectionData.description}
        onChange={(e) => setCollectionData({ ...collectionData, description: e.target.value })}
      />
    </>
  );

  return (
    <div>
      <p>SINGLE COLLECTION</p>
      {onEdit ? (
        <>
          {updateForm}
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Link to={`${collection._id}`}>
            <p>{title}</p>
            <p>{description}</p>
          </Link>
          <button type="button" onClick={() => setOnEdit(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Collection;
