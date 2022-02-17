import Image from "next/image";
import Link from "next/link";

export function Header(): JSX.Element | null {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container">
        <a className="navbar-brand" href="#">
          GamePools
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mb-2 d-flex flex-column w-100">
              <button className="btn btn-dark me-3">Perguntar</button>
            </li>
            <li className="nav-item mb-2 d-flex flex-column w-100  d-block d-lg-none">
              <Link href="/login" passHref>
                <button className="btn btn-dark me-3">
                  Login
                </button>
              </Link>
            </li>
            <li className="nav-item mb-2 d-flex flex-column d-none d-lg-block">
              <Link href="/login" passHref>
                <a>
                  <Image
                    src="/user-placeholder.png"
                    className="rounded-circle "
                    alt="..."
                    height={50}
                    width={50}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
