import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const Paginated = ({
  items, renderItem, page, pageCount,
}) => {
  const navigate = useNavigate();
  const handlePageClick = (event) => navigate(`?page=${event.target.textContent}`);
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
      {items && items.map((item) => renderItem(item))}
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
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  })).isRequired,
  renderItem: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Paginated;
