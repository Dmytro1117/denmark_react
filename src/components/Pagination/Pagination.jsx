import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { PaginationWrapper, PageButton, Dots } from "./Pagination.styled";

export const Pagination = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  // Визначаємо діапазон видимих сторінок
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  // Коригуємо початок, якщо вперлися в кінець
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <MdArrowBackIosNew size={22} />
      </PageButton>

      {/* Перша сторінка та три крапки, якщо ми далеко */}
      {startPage > 1 && (
        <>
          <PageButton onClick={() => onPageChange(1)}>1</PageButton>
          {startPage > 2 && <Dots>...</Dots>}
        </>
      )}

      {pages.map((page) => (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      {/* Остання сторінка та три крапки */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <Dots>...</Dots>}
          <PageButton onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PageButton>
        </>
      )}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <MdArrowForwardIos size={22} />
      </PageButton>
    </PaginationWrapper>
  );
};
