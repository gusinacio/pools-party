import { Col, Container, Row } from "react-bootstrap";
import { QuestionPage } from "./QuestionPage";
import { Question } from "./Question";
import { useEffect } from "react";
import { useQuestionQuery } from "../../graphql/generated";

export function QuestionTable(): JSX.Element | null {
  const { data, error, loading, called } = useQuestionQuery();

  const groupSize = 2;

  const questionsElement = data?.allQuestions
    .map((question, index) => {
      return (
        <Col
          key={index}
          xs={12}
          lg={6}
          className={index % 2 == 0 ? "mb-3 mb-lg-0" : ""}
        >
          <Question key={index} {...question} />
        </Col>
      );
    })
    .reduce<JSX.Element[][]>((r, element, index) => {
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, [])
    .map((row, index) => (
      <Row className="mt-3" key={index}>
        {row}
      </Row>
    ));

  return (
    <Container>
      {questionsElement}
      <QuestionPage currentPage={1} totalPages={10} />
    </Container>
  );
}
