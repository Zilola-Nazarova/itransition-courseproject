import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const searchItems = () => {
    if (search.trim()) {
      navigate(`/search?searchQuery=${search}&page=1`);
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
