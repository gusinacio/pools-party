import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useInput } from "../../../lib/hooks/useInput";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function LoginForm(): JSX.Element | null {
  const email = useInput("");
  const password = useInput("");

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  function handleLogin(): void {
    validateEmail();
    validatePassword();
    console.log(`${email.value} ${password.value}`);
  }

  function validateEmail(): void {
    setInvalidEmail(!emailRegex.test(email.value));
  }
  function validatePassword(): void {
    setInvalidPassword(password.value.length < 6);
  }

  return (
    <Col>
      <Container>
        <Row className="d-flex justify-content-center mb-5">
          <Image
            src="/user-placeholder.png"
            className="rounded-circle"
            alt="..."
            height={100}
            width={100}
          />
        </Row>

        <Row>
          <Card bg="light">
            <Container>
              <Form noValidate>
                <Row className="mb-3 mt-5">
                  <Col>
                    <Form.Group>
                      <FloatingLabel id="email" label="email">
                        <Form.Control
                          type="email"
                          isInvalid={invalidEmail}
                          className="rounded-pill"
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
                    <FloatingLabel id="password" label="senha">
                      <Form.Control
                        type="password"
                        isInvalid={invalidPassword}
                        className="rounded-pill"
                        placeholder="senha"
                        onBlur={validatePassword}
                        {...password}
                      />
                      {invalidPassword && (
                        <Form.Control.Feedback type="invalid">
                          Senha precisa ter mais que 6 caracteres.
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Button
                      href="/register"
                      variant="link"
                      className="text-secondary"
                    >
                      Cadastrar
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleLogin}>
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card>
        </Row>
        <Row>
          <Row className="mt-2">
            <Col className="d-flex justify-content-center">
              <Button href="/forgot-password" variant="link">
                esqueceu a senha?
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </Col>
  );
}
