import Image from "next/image";

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
          <ul className="navbar-nav">
            <li className="nav-item mb-2 d-flex flex-column">
              <button className="btn btn-dark me-3">Perguntar</button>
            </li>
            <li className="nav-item mb-2 d-flex flex-column">
              <button className="btn btn-dark me-3 d-block d-lg-none">
                Login
              </button>
            </li>
          </ul>

          <Image
            src="/user-placeholder.png"
            className="nav-item rounded-circle d-none d-lg-block"
            alt="..."
            height={50}
            width={50}
          />
        </div>
      </div>
    </nav>
  );
}
