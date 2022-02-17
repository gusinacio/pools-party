import { useEffect, useRef, useState } from "react";
import { Card, Col, Row, Toast, ToastBody, ToastContainer } from "react-bootstrap";
import { Choice } from "./Choice";

interface Props {
  index: number;

  title: string;
  description?: string;
  choices: string[];
  expiration: Date;
  votes: number;
  winner?: {
    name: string;
    votes: number;
  };
}

export function Question({
  title,
  choices,
  index,
  description,
  expiration,
  votes,
  winner
}: Props): JSX.Element {
  var [toast, setToast] = useState(false);

  const choiceElement = choices.map((choice, index) => {
    return <Choice key={index} choice={choice} />;
  });

  const timeLeft = expiration.getTime() - new Date().getTime();
  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let timeLeftString = "";
  if (days > 0) {
    timeLeftString = `${days} dias restantes`;
  } else if (hours > 0) {
    timeLeftString = `${hours} horas restantes`;
  } else if (minutes > 0) {
    timeLeftString = `${minutes} minutos restantes`;
  } else if (seconds > 0) {
    timeLeftString = `${seconds} segundos restantes`;
  } else {
    timeLeftString = `expirado em ${expiration.toLocaleDateString("pt-BR")}`;
  }
  return (
    <>
      <Card
        className="mb-3 h-100"
        onMouseEnter={() => setToast(true)}
        onMouseLeave={() => setToast(false)}
      >
        <Card.Header className="bg-secondary text-white">
          pergunta #{index}
        </Card.Header>
        <Card.Body className="fixed-height">
          <Card.Title className="text-center">{title}</Card.Title>
          {description && <Card.Text>{description}</Card.Text>}
          <div className="d-flex h-100">
            <Row className="align-self-center w-100">
              <Col className="d-flex flex-column align-items-center">
                {choiceElement}
              </Col>
            </Row>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted text-end">
          {timeLeftString}
        </Card.Footer>
      </Card>
      <ToastContainer position="bottom-end" className="position-fixed p-3" style={{ zIndex: 11 }}>
        <Toast show={toast}>
          <Toast.Header>
            <strong className="me-auto">pergunta #{index}</strong>
            <small>{timeLeftString}</small>
          </Toast.Header>
          <ToastBody>
            <p>Total de votos: {votes}</p>
            {winner ? <p>Resultado final: {winner.name} com {winner.votes} </p> : null}
          </ToastBody>
        </Toast>
      </ToastContainer>
    </>
  );
}
