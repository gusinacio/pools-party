import Link from "next/link";

export function Footer(): JSX.Element | null {
  return (
    <div className="container mw-100 m-0 bg-light">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link href="/#" passHref><a href="#" className="nav-link px-2 text-muted">Home</a></Link>
          </li>

          <li className="nav-item">
            <Link href="/new-question" passHref><a href="#" className="nav-link px-2 text-muted">Perguntar</a></Link>
          </li>

          <li className="nav-item">
            <Link href="/login" passHref><a href="#" className="nav-link px-2 text-muted">Minha Conta</a></Link>
          </li>
        </ul>
        <p className="text-center text-muted">&copy; 2022 GamePools</p>
      </footer>
    </div>
  );
}
