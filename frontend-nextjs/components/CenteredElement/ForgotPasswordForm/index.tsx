export function ForgotPasswordForm(): JSX.Element | null {
  return (
    <div className="card text-white bg-secondary">
      <div className="container">
        <div className="mb-3 mt-5 row">
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
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-light ">
              Recuperar senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
