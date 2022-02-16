interface Props {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: Props): JSX.Element | null {
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
      <ul className="pagination  justify-content-end">
        <li className={prevEnabled ? "page-item" : "page-item disabled"}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            {pages[0]}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            {pages[1]}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            {pages[2]}
          </a>
        </li>
        <li className={nextEnabled ? "page-item" : "page-item disabled"}>
          <a
            className="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
