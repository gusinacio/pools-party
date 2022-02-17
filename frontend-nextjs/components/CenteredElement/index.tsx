import { Col, Container, Row } from "react-bootstrap";

interface Props {
  form: JSX.Element;
}

export function CenteredForm({ form }: Props): JSX.Element | null {
  return (
    <Container fluid className="d-flex h-100">
      <Row className="align-self-center" style={{ flex: 1 }}>
        <Col xxl={3} xl={4} lg={4} md={6} sm={8} xs={12} className="mx-auto">
          {form}
        </Col>
      </Row>
    </Container>
  );
}
