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
  let nextEnabled = false;
  let prevEnabled = false;

  if (currentPage === 1) {
    pages[0] = 1;
    pages[1] = 2;
    pages[2] = 3;
    nextEnabled = true;
  } else if (currentPage === totalPages) {
    pages[0] = totalPages - 2;
    pages[1] = totalPages - 1;
    pages[2] = totalPages;
    prevEnabled = true;
  } else {
    pages[0] = currentPage - 1;
    pages[1] = currentPage;
    pages[2] = currentPage + 1;
    prevEnabled = true;
    nextEnabled = true;
  }

  return (
    <nav aria-label="Page navigation example">
      <Pagination className="justify-content-end mt-2">
        <Pagination.First href="#first"disabled={!prevEnabled}></Pagination.First>
        <Pagination.Item href="#1" active>{pages[0]}</Pagination.Item>
        <Pagination.Item href="#2">{pages[1]}</Pagination.Item>
        <Pagination.Item href="#3">{pages[2]}</Pagination.Item>
        <Pagination.Next href="#last" disabled={!nextEnabled}></Pagination.Next>
      </Pagination>
    </nav>
  );
}
