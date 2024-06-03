import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    <Form className="d-flex">
      <Row>
        <Col xs="auto">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            onClick={searchItems}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Searchbar;
