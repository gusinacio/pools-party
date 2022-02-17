import Link from "next/link";
import { Container } from "react-bootstrap";

export function Footer(): JSX.Element | null {
  return (
    <Container className="mw-100 mx-0 mt-5 bg-secondary">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link href="/#" passHref>
              <a href="#" className="nav-link px-2 text-light">Home</a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/new-question" passHref>
              <a href="#" className="nav-link px-2 text-light">Perguntar</a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/login" passHref>
              <a href="#" className="nav-link px-2 text-light">Minha Conta</a>
            </Link>
          </li>
        </ul>
        <p className="text-center text-light">&copy; 2022 GamePools</p>
      </footer>
    </Container>
  );
}
