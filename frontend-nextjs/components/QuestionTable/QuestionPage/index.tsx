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

  for (let i = Math.max(currentPage - 2, 1); i <= Math.min(totalPages, currentPage + 2); i++) {
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
        {pages.map((page, index) => (
          <Pagination.Item key={index} active={index + 1 == currentPage} href={`/?page=${index + 1}`}>
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
