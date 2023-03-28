import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
  }

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    // Push however many pages there is to the pageNumbers array
    const pageNumbers: number[] = [];
    for (let i: number = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // Visibile number of pages you can see under coins
    let visiblePages = 5

    // Get the start page
    const startPage: number = Math.max(currentPage - Math.floor(visiblePages / 2), 1);

    // Get the end page
    const endPage: number = Math.min(startPage + visiblePages - 1, totalPages);

  
    return (
      <div className="pagination">
        <button className="pagPrev" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <AiOutlineLeft />
        </button>
        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
        <button id="pagNumbers"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? 'pageActive' : ''}
        >
          {pageNumber}
        </button>
      ))}
        <button className="pagNext" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <AiOutlineRight />
        </button>
      </div>
    );
  }

  export default Pagination