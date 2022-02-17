import { MouseEventHandler, useState } from "react";
import { useInput } from "../../../lib/hooks/useInput";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function ForgotPasswordForm(): JSX.Element | null {
  const email = useInput("");

  const [invalidEmail, setInvalidEmail] = useState(false);

  function handleForgotPassword(): void {
    console.log(invalidEmail);
    console.log(`${email.value}`);
  }

  function validateEmail(): void {
    setInvalidEmail(email.value.length > 0 && !emailRegex.test(email.value));
  }

  return (
    <div className="card text-white bg-light">
      <div className="container">
        <div className="mb-3 mt-5 row">
          <div className="col">
            <label className="visually-hidden" htmlFor="email">
              email
            </label>
            <input
              type="email"
              className={["form-control", invalidEmail ? "is-invalid" : "",].join(" ")}
              id="email"
              placeholder="email"
              onBlur={validateEmail}
              {...email}
            />
            {invalidEmail && (
                    <div className="invalid-feedback">
                      Email inválido. (exemplo@email.com)
                    </div>
                  )}
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col d-flex justify-content-end">
            <button type="submit" className="btn btn-secondary " onClick={handleForgotPassword}>
              Recuperar senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
