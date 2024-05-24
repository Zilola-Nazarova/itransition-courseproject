import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItemsBySearch } from '../redux/search/searchSlice';

const Searchbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const searchItems = () => {
    if (search.trim()) {
      dispatch(getItemsBySearch(search));
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate('/');
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchItems();
    }
  };
  return (
    <div>
      <h2>Searchbar</h2>
      <input
        name="search"
        label="Search Items"
        value={search}
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="button"
        onClick={searchItems}
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
