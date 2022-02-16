import Image from "next/image";
import Link from "next/link";

export function LoginForm(): JSX.Element | null {
  return (
    <div className="col">
      <div className="row d-flex justify-content-center mb-5">
        <Image
          src="/user-placeholder.png"
          className="rounded-circle"
          alt="..."
          height={100}
          width={100}
        />
      </div>

      <div className="row">
        <div className="card text-white bg-secondary">
          <div className="container">
            <div className="mb-3 mt-5 row">
              <div className="col">
                <label className="visually-hidden" htmlFor="email">
                  email
                </label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="email"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label className="visually-hidden" htmlFor="password">
                  senha
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="senha"
                />
              </div>
            </div>
            <div className="mb-4 row">
              <div className="col">
                <Link href="/register" passHref>
                  <a className="btn text-white">Cadastrar</a>
                </Link>
              </div>
              <div className="col d-flex justify-content-end">
                <button type="submit" className="btn btn-light ">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mt-2 row">
          <div className="col  d-flex justify-content-center">
            <a type="button" className="btn text-primary">
              esqueceu a senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
