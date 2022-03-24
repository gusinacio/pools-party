import Link from "next/link";
import { Pagination } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number;
}

export function QuestionPage({
  currentPage,
  totalPages,
}: Props): JSX.Element | null {
  const pages: number[] = [];
  let nextDisabled = false;
  let prevDisabled = false;
  const from = Math.min(Math.max(1, currentPage - 2), totalPages - 4);
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
          href={`/?page=${currentPage - 1}`}
          disabled={prevDisabled}
        ></Pagination.First>
        {pages.map((page) => (
          <Pagination.Item key={page} active={page == currentPage} href={`/?page=${page}`}>
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          href={`/?page=${currentPage + 1}`}
          disabled={nextDisabled}
        ></Pagination.Next>
      </Pagination>
    </nav>
  );
}
