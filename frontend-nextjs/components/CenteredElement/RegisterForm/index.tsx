import { MouseEventHandler, useState } from "react";
import { useInput } from "../../../lib/hooks/useInput";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormFloating,
  Row,
} from "react-bootstrap";

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
    <Card bg="light">
      <Container>
        <Row className="mb-3 mt-5">
          <Col>
            <Form.Group>
              <FloatingLabel controlId="username" label="nome de usuário">
                <Form.Control
                  type="text"
                  className="rounded-pill"
                  isInvalid={invalidUserName}
                  id="username"
                  placeholder="nome do usuário"
                  onBlur={validateUserName}
                  {...userName}/>
                  {invalidUserName && (
                    <Form.Control.Feedback type="invalid">
                      O nome deve conter 3 caracteres, somente alfanuméricos.
                    </Form.Control.Feedback>
                  )}
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <FloatingLabel controlId="email" label="email">
                <Form.Control
                  type="email"
                  className="rounded-pill"
                  isInvalid={invalidEmail}
                  id="email"
                  placeholder="email"
                  onBlur={validateEmail}
                  {...email}
                />
                {invalidEmail && (
                  <Form.Control.Feedback type="invalid">
                    Email inválido. (exemplo@email.com)
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <FloatingLabel controlId="password" label="senha">
                <Form.Control
                  type="password"
                  className="rounded-pill"
                  isInvalid={invalidPassword}
                  id="password"
                  placeholder="senha"
                  onBlur={validatePassword}
                  {...password}
                />
                {invalidPassword && (
                  <Form.Control.Feedback type="invalid">
                    A senha precisa ter mais que 6 caracteres.
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <FloatingLabel controlId="confirmPassword" label="confirme sua senha">
                <Form.Control
                  type="password"
                  className="rounded-pill"
                  isInvalid={invalidPassword2}
                  id="password2"
                  placeholder="senha"
                  onBlur={validatePassword2}
                  {...password2}
                />
                {invalidPassword2 && (
                  <Form.Control.Feedback type="invalid">
                    A senha precisa ter mais que 6 caracteres.
                  </Form.Control.Feedback>
                )}
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Button type="submit" className="btn-secondary " onClick={handleRegister}>
              Cadastrar
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
