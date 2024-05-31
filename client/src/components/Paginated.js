import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import { useSearchParams } from 'react-router-dom';

const Paginated = ({
  items, renderItem, page, pageCount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handlePageClick = (event) => {
    setSearchParams((params) => params.set('page', event.target.textContent));
    navigate(`?${searchParams}`);
  };
  const pages = [];
  for (let number = 1; number <= pageCount; number += 1) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={handlePageClick}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <>
      <Container fluid="md">
        {items && items.map((item) => renderItem(item))}
      </Container>
      <div>
        <Pagination>{pages}</Pagination>
      </div>
    </>
  );
};

Paginated.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  renderItem: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Paginated;
