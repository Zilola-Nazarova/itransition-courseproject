import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import ReactPaginate from 'react-paginate';
import Collection from './collection/Collection';

const PaginatedCollections = () => {
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const { value: items } = useSelector((state) => state.collections);
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
      {currentItems && currentItems.map((collection) => (
        <Collection key={uuidv4()} collection={collection} />
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

export default PaginatedCollections;
