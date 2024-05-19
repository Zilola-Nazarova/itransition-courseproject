import PropTypes from 'prop-types';
import FileBase from 'react-file-base64';
import { v4 as uuidv4 } from 'uuid';

const UpdateCollection = ({ collectionData, collection, handleChange }) => {
  const categories = ['cat1', 'cat2', 'cat3', 'other'];

  return (
    <>
      <input
        required
        placeholder={collection.title}
        value={collectionData.title}
        onChange={(e) => handleChange({ ...collectionData, title: e.target.value })}
      />
      <input
        required
        placeholder={collection.text}
        value={collectionData.text}
        onChange={(e) => handleChange({ ...collectionData, text: e.target.value })}
      />
      <select
        required
        onChange={(e) => handleChange({ ...collectionData, category: e.target.value })}
        value={collectionData.category}
      >
        <option value="none" disabled hidden>Please select a category</option>
        {categories.map((category) => (
          <option key={uuidv4()} value={category}>{category}</option>
        ))}
      </select>
      <div>
        {collection.image
          ? <img src={collection.image} alt={collection.title} />
          : <p>No image provided</p>}
        <FileBase
          type="file"
          multiple={false}
          value={collectionData.image}
          onDone={({ base64 }) => handleChange({ ...collectionData, image: base64 })}
        />
      </div>
    </>
  );
};

UpdateCollection.propTypes = {
  collection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  collectionData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default UpdateCollection;
