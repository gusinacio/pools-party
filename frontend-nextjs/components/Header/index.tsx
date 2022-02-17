import Image from "next/image";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export function Header(): JSX.Element | null {
  return (
    <Navbar bg="secondary" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand className="text-light" href="#">
            GamePools
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0" />
          <Nav className="align-items-center">
            <Nav.Link
              href="/new-question"
              className="mb-2 d-flex flex-column w-100"
            >
              <button className="btn btn-dark me-3">Perguntar</button>
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="mb-2 d-flex flex-column w-100 d-block d-lg-none"
            >
              <button className="btn btn-dark me-3">Login</button>
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="mb-2 d-flex flex-column d-none d-lg-block"
            >
              <a>
                <Image
                  src="/user-placeholder.png"
                  className="rounded-circle"
                  alt="..."
                  height={50}
                  width={50}
                />
              </a>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
