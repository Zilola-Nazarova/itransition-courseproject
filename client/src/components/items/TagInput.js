import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AutoSuggest from 'react-autosuggest';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../redux/tags/tagsSlice';

const TagInput = ({ pushTag, value, setValue }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);
  const options = useSelector((state) => state.tags.value);
  const lowerCaseOptions = options.map((tag) => (
    { id: tag._id, tagname: tag.tagname.toLowerCase() }
  ));
  const [suggestions, setSuggestions] = useState([]);
  const getSuggestions = (value) => lowerCaseOptions.filter(
    (tag) => tag.tagname.includes(value.trim().toLowerCase()),
  );

  return (
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
  );
};

TagInput.propTypes = {
  pushTag: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default TagInput;
