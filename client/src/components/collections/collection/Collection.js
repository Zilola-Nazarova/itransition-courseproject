import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FileBase from 'react-file-base64';
import { v4 as uuidv4 } from 'uuid';
import { updateCollection, deleteCollection } from '../../../redux/collections/collectionsSlice';

const Collection = ({ collection }) => {
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState(false);
  const {
    _id,
    title,
    text,
    category,
    image,
  } = collection;
  const [collectionData, setCollectionData] = useState({
    _id,
    title,
    text,
    category: category[0],
    image,
  });
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateCollection(collectionData));
    setOnEdit(false);
  };
  const categories = ['cat1', 'cat2', 'cat3', 'other'];

  const updateForm = (
    <>
      <input
        required
        placeholder={title}
        value={collectionData.title}
        onChange={(e) => setCollectionData({ ...collectionData, title: e.target.value })}
      />
      <input
        required
        placeholder={text}
        value={collectionData.text}
        onChange={(e) => setCollectionData({ ...collectionData, text: e.target.value })}
      />
      <select
        required
        placeholder="category"
        onChange={(e) => setCollectionData({ ...collectionData, category: e.target.value })}
        value={collectionData.category}
      >
        <option value="none" disabled hidden>Please select a category</option>
        {categories.map((category) => (
          <option key={uuidv4()} value={category}>{category}</option>
        ))}
      </select>
      <div>
        <img src={image} alt={title} />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setCollectionData({ ...collectionData, image: base64 })}
        />
      </div>
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
            <p>{_id}</p>
            <p>{title}</p>
            <p>{text}</p>
            <p>{category}</p>
            {image ? <img src={image} alt={title} /> : <p>No image provided</p>}
          </Link>
          <button type="button" onClick={() => setOnEdit(true)}>Edit</button>
        </>
      )}
      <button type="button" onClick={() => dispatch(deleteCollection(_id))}>Delete</button>
    </div>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(String).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Collection;
