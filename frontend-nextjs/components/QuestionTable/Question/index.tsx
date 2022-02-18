import { useEffect, useRef, useState } from "react";
import {
  Card,
  Col,
  Row,
  Toast,
  ToastBody,
  ToastContainer,
} from "react-bootstrap";
import { Choice } from "./Choice";

interface Props {
  index: number;

  title: string;
  description?: string;
  choices: string[];
  expiration: Date;
  votes: number;
  winner?: number;
  results?: number[];
}

export function Question({
  title,
  choices,
  index,
  description,
  expiration,
  votes,
  winner,
  results,
}: Props): JSX.Element {
  var [toast, setToast] = useState(false);
  const [voted, setVoted] = useState<number>(-1);

  function onVote(index: number) {
    console.log(index)
    if (voted != -1) return
    setVoted(index);
  }

  const choiceElement = choices.map((choice, index) => {
    return (
      <Choice
        key={index}
        index={index}
        choice={choice}
        finalized={winner ? true : voted != -1 && voted != index}
        winner={winner ? winner == index : false}
        voted={voted == index}
        onVote={onVote}
      />
    );
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
      <ToastContainer
        position="bottom-end"
        className="position-fixed p-3"
        style={{ zIndex: 11 }}
      >
        <Toast show={toast}>
          <Toast.Header>
            <strong className="me-auto">pergunta #{index}</strong>
            <small>{timeLeftString}</small>
          </Toast.Header>
          <ToastBody>
            <p>Total de votos: {votes}</p>
            {winner && results ? (
              <p>
                Resultado final: {choices[winner]} com {results[winner]} votos
              </p>
            ) : null}
          </ToastBody>
        </Toast>
      </ToastContainer>
    </>
  );
}
