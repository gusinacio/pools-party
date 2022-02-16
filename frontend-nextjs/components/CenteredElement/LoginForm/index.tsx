export function LoginForm(): JSX.Element | null {
  return (
    <div className="col">
      <div className="row">
        <div className="card text-white bg-secondary">
          <div className="container">
            <div className="mb-3 mt-5 row">
              <div className="col">
                <label className="visually-hidden" htmlFor="username">
                  nome do usuário
                </label>
                <div className="input-group">
                  <div className="input-group-text">@</div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="nome do usuário"
                  />
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label className="visually-hidden" htmlFor="password">
                  senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="senha"
                />
              </div>
            </div>
            <div className="mb-4 row">
              <div className="col">
                <button type="submit" className="btn btn-outline-light">
                  Cadastrar
                </button>
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
            <a type="button" className="btn btn-link">
              esqueceu a senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
