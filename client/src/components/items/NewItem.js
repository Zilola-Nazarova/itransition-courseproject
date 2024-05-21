import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { postItem } from '../../redux/items/itemsSlice';
import { getTags } from '../../redux/tags/tagsSlice';

const NewItem = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  const options = useSelector((state) => state.tags.value);
  const lowerCaseOptions = options.map((tag) => (
    { id: tag._id, tagname: tag.tagname.toLowerCase() }
  ));
  const { userId, collId } = useParams();
  const emptyItemObj = { title: '', text: '' };
  const [itemData, setItemData] = useState(emptyItemObj);
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState('');
  const clear = () => {
    setItemData(emptyItemObj);
    setValue('');
    setTags([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postItem({ userId, collId, newItem: { ...itemData, tags } }));
    clear();
  };
  const [suggestions, setSuggestions] = useState([]);
  const getSuggestions = (value) => lowerCaseOptions.filter(
    (tag) => tag.tagname.includes(value.trim().toLowerCase()),
  );
  const pushTag = (tag) => {
    setTags([...tags, tag]);
    setValue('');
  };
  const excludeTag = (toDelete) => {
    setTags(tags.filter((tag) => tag !== toDelete));
  };
  return (
    <div className="form">
      <h3>CREATE ITEM</h3>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="title"
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <input
          required
          placeholder="text"
          value={itemData.text}
          onChange={(e) => setItemData({ ...itemData, text: e.target.value })}
        />
        <ul>
          {tags.map((tag) => (
            <li key={uuidv4()}>
              {tag}
              <button type="button" onClick={() => excludeTag(tag)}>X</button>
            </li>
          ))}
        </ul>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setValue(value);
            setSuggestions(getSuggestions(value));
          }}
          onSuggestionSelected={
            (_, { suggestionValue }) => {
              pushTag(suggestionValue);
            }
          }
          getSuggestionValue={(suggestion) => suggestion.tagname}
          renderSuggestion={(suggestion) => <span>{suggestion.tagname}</span>}
          inputProps={{
            placeholder: 'Enter tags',
            value,
            onChange: (_, { newValue }) => {
              setValue(newValue);
            },
            onKeyDown: (e) => {
              if (e.key !== 'Enter') return;
              if (!e.target.value.trim()) return;
              e.preventDefault();
              pushTag(e.target.value.trim());
            },
          }}
          highlightFirstSuggestion
        />
        <button type="button" onClick={() => pushTag(value)}>Add tag</button>
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default NewItem;
