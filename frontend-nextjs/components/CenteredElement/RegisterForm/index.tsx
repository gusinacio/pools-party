export function RegisterForm(): JSX.Element | null {
  return (
    <div className="card bg-secondary">
      <div className="container">
        <div className="mb-3 mt-5 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control rounded-pill"
                id="username"
                placeholder="nome do usuário"
              />
              <label htmlFor="username">nome do usuário</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="email"
                className="form-control rounded-pill"
                id="email"
                placeholder="email"
              />
              <label htmlFor="email">email</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className="form-control rounded-pill"
                id="password"
                placeholder="senha"
              />
              <label htmlFor="password">senha</label>
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className="form-control rounded-pill"
                id="confirmPassword"
                placeholder="confirme sua senha"
              />
              <label htmlFor="confirmPassword">confirme sua senha</label>
            </div>
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
