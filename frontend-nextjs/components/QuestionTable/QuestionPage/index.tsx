import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => Promise<void>;
  // onHover: (page: number) => Promise<void>;
}

export function QuestionPage({
  currentPage,
  totalPages,
  onClick,
  // onHover
}: Props): JSX.Element | null {
  const pages: number[] = [];
  let nextDisabled = false;
  let prevDisabled = false;
  const from = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const to = Math.min(totalPages, from + 4);
  for (let i = from; i <= to; i++) {
    pages.push(i);
  }

  if (currentPage === 1) {
    prevDisabled = true;
  }
  if (currentPage === totalPages) {
    nextDisabled = true;
  }

  return (
    <nav aria-label="Page navigation example">
      <Pagination className="justify-content-end mt-2">
        <Pagination.First
          // href={`/?page=${currentPage - 1}`}
          onClick={() => onClick(currentPage - 1)}
          disabled={prevDisabled}
        ></Pagination.First>
        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page == currentPage}
            onClick={() => onClick(page)}
            // onMouseOver={() => onHover(page)}
            // href={`/?page=${page}`}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          // href={`/?page=${currentPage + 1}`}
          disabled={nextDisabled}
          onClick={() => onClick(currentPage + 1)}
        ></Pagination.Next>
      </Pagination>
    </nav>
  );
}
