import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { useInput } from "../../../lib/hooks/useInput";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function LoginForm(): JSX.Element | null {
  const email = useInput("");
  const password = useInput("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  function handleLogin(): void {
    console.log(invalidEmail);
    console.log(`${email.value} ${password.value}`);
  }

  function validateEmail(): void {
    setInvalidEmail(email.value.length > 0 && !emailRegex.test(email.value));
  }
  function validatePassword(): void {
    setInvalidPassword(password.value.length > 0 && password.value.length < 6);
  }

  return (
    <div className="col">
      <div className="container">
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
          <div className="card bg-light">
            <div className="container">
              <div className="mb-3 mt-5 row">
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
                        Senha precisa ter mais que 6 caracteres.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4 row">
                <div className="col">
                  <Link href="/register" passHref>
                    <a className="btn text-secondary">Cadastrar</a>
                  </Link>
                </div>
                <div className="col d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={handleLogin}
                  >
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
              <Link href="/forgot-password" passHref>
                <a type="button" className="btn text-primary">
                  esqueceu a senha?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
