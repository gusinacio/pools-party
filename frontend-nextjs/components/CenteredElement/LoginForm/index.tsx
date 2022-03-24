import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useLoginMutation } from "../../../graphql/generated";
import { useAuth } from "../../../lib/hooks/useAuth";
import { useInput } from "../../../lib/hooks/useInput";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function LoginForm(): JSX.Element | null {
  const router = useRouter();
  const email = useInput("");
  const password = useInput("");
  const [login, { data, error }] = useLoginMutation();
  const { setToken } = useAuth();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  useEffect(() => {
    const authPayload = data?.login;
    if (authPayload) {
      setToken(authPayload);
      router.push("/");
    }
  }, [data, router, setToken]);

  async function handleLogin(e: FormEvent): Promise<void> {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (!invalidEmail && !invalidPassword) {
      login({
        variables: {
          email: email.value,
          password: password.value,
        },
      }).catch(() => {});
    }
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
              <Form noValidate className="mt-5" onSubmit={handleLogin}>
                {errorMessage && (
                  <Row className="mb-3">
                    <Col>
                      <Alert
                        variant="danger"
                        dismissible
                        onClose={() => setErrorMessage("")}
                      >
                        {errorMessage}
                      </Alert>
                    </Col>
                  </Row>
                )}
                <Row className="mb-3">
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
                    <Button type="submit" variant="secondary">
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </Card>
        </Row>
        {/* <Row>
          <Row className="mt-2">
            <Col className="d-flex justify-content-center">
              <Button href="/forgot-password" variant="link">
                esqueceu a senha?
              </Button>
            </Col>
          </Row>
        </Row> */}
      </Container>
    </Col>
  );
}
