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
    <Card bg="light">
      <Container>
        <Row className="mb-3 mt-5">
          <Col>
            <FloatingLabel className="visually-hidden" label="email" id="email">
              email
            </FloatingLabel>
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
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <Button type="submit" className="btn btn-secondary " onClick={handleForgotPassword}>
              Recuperar senha
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
