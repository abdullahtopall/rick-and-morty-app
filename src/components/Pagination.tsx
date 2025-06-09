import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const pageSizeOptions = [10, 20, 50, 100];

type PageNumber = number | '...';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems
}) => {
  // Generate page numbers to display
  const getPageNumbers = (): PageNumber[] => {
    const pageNumbers: PageNumber[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show a window of pages around the current page
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      // Always show first page
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push('...');
        }
      }
      
      // Add the window of pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Always show last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{' '}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} characters
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="pagination-ellipsis">
                {page}
              </span>
            )
          ))}
        </div>
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      
      <div className="page-size-selector">
        <label htmlFor="pageSize">Show:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default Pagination; 