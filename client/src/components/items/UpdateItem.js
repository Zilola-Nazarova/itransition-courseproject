import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import TagInput from './TagInput';

const UpdateItem = ({
  itemData, item, handleChange, newTags, setNewTags,
}) => {
  const [tagError, setTagError] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const pushTag = (tag) => {
    setNewTags([...newTags, tag]);
    setTagValue('');
  };
  const excludeTag = (toDelete) => {
    setNewTags(newTags.filter((tag) => tag !== toDelete));
  };

  return (
    <form>
      <input
        required
        placeholder={item.title}
        value={itemData.title}
        onChange={(e) => handleChange({ ...itemData, title: e.target.value })}
      />
      <textarea
        required
        placeholder={item.text}
        value={itemData.text}
        onChange={(e) => handleChange({ ...itemData, text: e.target.value })}
      />
      {tagError && (
        <Alert variant="danger">
          Only letters, numbers and _ are allowed.
        </Alert>
      )}
      <ul>
        {newTags.map((tag) => (
          <li key={uuidv4()}>
            {tag}
            <button type="button" onClick={() => excludeTag(tag)}>X</button>
          </li>
        ))}
      </ul>
      <TagInput
        setTagError={setTagError}
        pushTag={pushTag}
        value={tagValue}
        setValue={setTagValue}
      />
      <button type="submit">Save</button>
    </form>
  );
};

UpdateItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  itemData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  newTags: PropTypes.arrayOf(String).isRequired,
  setNewTags: PropTypes.func.isRequired,
};

export default UpdateItem;
