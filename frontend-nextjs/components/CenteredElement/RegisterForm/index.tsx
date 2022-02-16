export function RegisterForm(): JSX.Element | null {
  return (
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
            <label className="visually-hidden" htmlFor="email">
              email
            </label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              id="password"
              placeholder="senha"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <label className="visually-hidden" htmlFor="confirmPassword">
              confirme sua senha
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="confirme sua senha"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-light ">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
