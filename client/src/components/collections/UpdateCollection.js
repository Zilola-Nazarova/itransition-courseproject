import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const UpdateCollection = ({ collectionData, collection, handleChange }) => {
  const { value: categories, isLoading, error } = useSelector((state) => state.categories);

  return (
    <>
      <input
        required
        placeholder={collection.title}
        value={collectionData.title}
        onChange={(e) => handleChange({ ...collectionData, title: e.target.value })}
      />
      <textarea
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
        {isLoading && <option value="none" disabled hidden>Browsing categories</option>}
        {error && <option value="none" disabled hidden>Could not browse categories. Please refresh the page.</option>}
        {categories?.map((category) => (
          <option key={uuidv4()} value={category}>{category}</option>
        ))}
      </select>
      <div>
        {collection.image
          ? <img src={collection.imageUrl} alt={collection.title} />
          : <p>No image provided</p>}
        <input
          type="file"
          onChange={(e) => handleChange({ ...collectionData, image: e.target.files[0] })}
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
    imageUrl: PropTypes.string.isRequired,
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
