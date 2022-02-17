import { MouseEventHandler, useState } from "react";
import { useInput } from "../../../lib/hooks/useInput";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userNameRegex = /^[a-zA-Z0-9]+$/

export function RegisterForm(): JSX.Element | null {
  const userName = useInput("")
  const email = useInput("");
  const password = useInput("");
  const password2 = useInput("");

  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPassword2, setInvalidPassword2] = useState(false);

  function handleRegister(): void {
    console.log(invalidEmail);
    console.log(`${userName.value} ${email.value} ${password.value} ${password2.value}`);
  }

  function validateUserName(): void {
    setInvalidUserName(userName.value.length < 3 || !userNameRegex.test(userName.value));
  }
  function validateEmail(): void {
    setInvalidEmail(email.value.length > 0 && !emailRegex.test(email.value));
  }
  function validatePassword(): void {
    setInvalidPassword(password.value.length > 0 && password.value.length < 6);
  }
  function validatePassword2(): void {
    setInvalidPassword2(password2.value.length > 0 && password2.value.length < 6);
  }

  return (
    <div className="card bg-light">
      <div className="container">
        <div className="mb-3 mt-5 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className={[
                  "form-control rounded-pill",
                  invalidUserName ? "is-invalid" : "",
                ].join(" ")}
                id="username"
                placeholder="nome do usuário"
                onBlur={validateUserName}
                {...userName}
              />
              <label htmlFor="username">nome do usuário</label>
              {invalidUserName && (
                <div className="invalid-feedback">
                  O nome deve conter 3 caracteres, somente alfanuméricos.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="email"
                className={[
                  "form-control rounded-pill",
                  invalidEmail ? "is-invalid" : "",
                ].join(" ")}
                id="email"
                placeholder="email"
                onBlur={validateEmail}
                {...email}
              />
              <label htmlFor="email">email</label>
              {invalidEmail && (
                <div className="invalid-feedback">
                  Email inválido. (exemplo@email.com)
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className={[
                  "form-control rounded-pill",
                  invalidPassword ? "is-invalid" : "",
                ].join(" ")}
                id="password"
                placeholder="senha"
                onBlur={validatePassword}
                {...password}
              />
              <label htmlFor="password">senha</label>
              {invalidPassword && (
                <div className="invalid-feedback">
                  A senha precisa ter mais que 6 caracteres.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col">
            <div className="form-floating">
              <input
                type="password"
                className={[
                  "form-control rounded-pill",
                  invalidPassword2 ? "is-invalid" : "",
                ].join(" ")}
                id="password2"
                placeholder="senha"
                onBlur={validatePassword2}
                {...password2}
              />
              <label htmlFor="confirmPassword">confirme sua senha</label>
              {invalidPassword2 && (
                <div className="invalid-feedback">
                  A senha precisa ter mais que 6 caracteres.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-secondary " onClick={handleRegister}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
