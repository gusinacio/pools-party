import Link from "next/link";
import Image from "next/image";
import { useInput } from "../../../lib/hooks/useInput";
import {
  Button,
  Card,
  Col,
  Container,
  FormLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useCreateQuestionMutation } from "../../../graphql/generated";
import { useRouter } from "next/router";

export function NewQuestionForm(): JSX.Element | null {
  const [createQuestion, { data, error }] = useCreateQuestionMutation();
  const router = useRouter();

  const date = useInput("");
  const question = useInput("");
  const alternatives = [useInput(""), useInput(""), useInput(""), useInput("")];

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidQuestion, setInvalidQuestion] = useState(false);
  const alternativeValidation = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  useEffect(() => {
    const question = data?.createQuestion;
    if (question) {
      console.log(`Question created with id ${question.id}`);
      // router.push(`/question/${question.id}`);
      router.push(`/`);
    }
  }, [data, router]);

  function handleNewQuestion(): void {
    console.log(invalidQuestion);
    console.log(
      `${question.value} ${date.value} ${alternatives[0].value} ${alternatives[1].value}`
    );
    validateQuestion();
    validateAlternatives();
    validateDate();
    const invalidAlternatives = alternativeValidation
      .map((alt) => alt[0])
      .reduce((acc, curr) => acc || curr);
    if (!invalidDate && !invalidQuestion && !invalidAlternatives) {
      createQuestion({
        variables: {
          title: question.value,
          expiresAt: date.value,
          alternatives: alternatives
            .map((alternative) => alternative.value)
            .filter((alt) => alt !== ""),
        },
      });
    }
  }

  function validateDate(): void {
    setInvalidDate(date.value == "");
  }

  function validateQuestion(): void {
    setInvalidQuestion(question.value.length < 5);
  }

  function validateAlternatives(): void {
    const filledList = alternatives.map(
      (alternative) => alternative.value.length > 0
    );

    for (let i = 0; i < alternatives.length; i++) {
      const [_, setInvalidAlternative] = alternativeValidation[i];
      if (i >= 2 && !anyFilled(filledList.slice(i, filledList.length)))
        continue;

      setInvalidAlternative(alternatives[i].value.length == 0);
    }
  }

  function validateAlternative(index: number): void {
    const filledList = alternatives.map(
      (alternative) => alternative.value.length > 0
    );
    const [_, setInvalidAlternative] = alternativeValidation[index];
    if (index >= 2 && !anyFilled(filledList.slice(index, filledList.length)))
      return;
    setInvalidAlternative(alternatives[index].value.length == 0);
  }

  function anyFilled(array: boolean[]): boolean {
    return array.reduce((a, b) => a || b);
  }

  function renderAlternatives(): JSX.Element[] {
    const rendering: JSX.Element[] = [];

    const filledList = alternatives.map(
      (alternative) => alternative.value.length > 0
    );
    for (let i: number = 0; i < alternatives.length; i++) {
      const alternative = alternatives[i];
      const [invalidAlternative, _] = alternativeValidation[i];

      if (
        i >= 2 &&
        !anyFilled(filledList.slice(i, filledList.length)) &&
        (!(filledList[0] && filledList[1]) || !filledList[i - 1])
      )
        continue;

      rendering.push(
        <div key={`alt${i}`}>
          <input
            type="text"
            name="alternative"
            id="alternative"
            className={`form-control mb-1 ${
              invalidAlternative ? "is-invalid" : ""
            }`}
            placeholder={`Alternativa #${i + 1}`}
            {...alternative}
            onBlur={() => validateAlternative(i)}
          />
          {invalidAlternative && (
            <div className="invalid-feedback">
              O campo não pode ficar vazio.
            </div>
          )}
        </div>
      );
    }

    return rendering;
  }

  return (
    <Container>
      <Card className="card mb-3">
        <Card.Header className="bg-secondary text-light">
          Nova Enquete
        </Card.Header>

        <Card.Body className="pt-0 pb-0">
          <Row className="mb-2 mt-2">
            <Col>
              <FormLabel className="mb-1 mt-1" htmlFor="question">
                Digite sua pergunta:
              </FormLabel>
              <Form.Control
                type="text"
                name="question"
                id="question"
                className="mb-1"
                isInvalid={invalidQuestion}
                placeholder="Pergunta"
                onBlur={validateQuestion}
                {...question}
              />
              {invalidQuestion && (
                <Form.Control.Feedback type="invalid">
                  A pergunta de conter no mínimo 5 caracteres.
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>

          <Row className="mb-2 mt-2">
            <Col>
              <FormLabel className="mb-1 mt-1">Alternativas:</FormLabel>
              {renderAlternatives()}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Col>
            <FormLabel className="mb-1 mt-1" htmlFor="data">
              A enquete encerra em:
            </FormLabel>
            <Form.Control
              type="datetime-local"
              name="data"
              isInvalid={invalidDate}
              className="text-muted"
              min={
                new Date().getFullYear() +
                "-" +
                String(new Date().getMonth() + 1).padStart(2, "0") +
                "-" +
                String(new Date().getDate() + 2) +
                "T" +
                new Date().getHours() +
                ":" +
                new Date().getMinutes()
              }
              onBlur={validateDate}
              {...date}
            />
            {invalidDate && (
              <Form.Control.Feedback type="invalid">
                A data deve ser preenchida.
              </Form.Control.Feedback>
            )}
          </Col>
        </Card.Footer>
      </Card>

      <Row className="m-2">
        <Col className="col d-flex justify-content-center">
          <Link href="/#" passHref>
            <Button className=" btn-secondary btn-sm w-25 mx-2">
              Cancelar
            </Button>
          </Link>
          <Button
            type="button"
            className="btn btn-secondary btn-sm w-25 mx-2"
            onClick={handleNewQuestion}
          >
            Enviar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
