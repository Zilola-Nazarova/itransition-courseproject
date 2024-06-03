import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('searchQuery') || '');
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
    <Form className="d-flex align-items-center gap-3">
      <Form.Control
        className="searchbar"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="success"
        onClick={searchItems}
      >
        Search
      </Button>
    </Form>
  );
};

export default Searchbar;
