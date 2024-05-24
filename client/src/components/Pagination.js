import { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ items, itemsPerPage, renderItem }) => {
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
    navigate(`?page=${event.selected}`);
  };
  return (
    <>
      {currentItems
        && currentItems.map((item) => (
          renderItem(item)
        ))}
      <ReactPaginate
        className="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        hrefBuilder={(currentPage) => `?page=${currentPage}`}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

Pagination.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default Pagination;
