import { Col, Container, Row, Spinner } from "react-bootstrap";
import { QuestionPage } from "./QuestionPage";
import { Question } from "./Question";
import { useEffect, useState } from "react";
import { useQuestionQuery } from "../../graphql/generated";
import { useRouter } from "next/router";

const PAGE_SIZE = 4;

export function QuestionTable(): JSX.Element | null {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, loading, refetch, fetchMore } = useQuestionQuery({
    variables: {
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    },
  });
  const [questionElements, setQuestionElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    router.query.page && setPage(parseInt(router.query.page as string));
  }, [router]);

  useEffect(() => {
    if (!data) return;
    const questionsElement = data.questions.results.map((question, index) => {
      return (
        <Col
          key={index}
          className="mb-3"
        >
          <Question key={question.id} refetch={refetch} {...question} />
        </Col>
      );
    });
    setQuestionElements(questionsElement);
  }, [data, router, refetch]);

  if (loading) {
    return (
      <Container style={{ minHeight: "85vh" }} className="d-flex">
        <Spinner
          animation="border"
          role="status"
          className="align-self-center mx-auto"
          style={{ width: "5rem", height: "5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container style={{ minHeight: "85vh" }}>
      <Row xs={1} lg={2} className="g-3">{questionElements}</Row>
      <QuestionPage
        currentPage={page}
        onClick={async (page: number) => {
          fetchMore({
            variables: {
              offset: (page - 1) * PAGE_SIZE,
            },
          });
          setPage(page);
        }}
        // onHover={async (page: number) => {
        //   fetchMore({
        //     variables: {
        //       offset: (page - 1) * PAGE_SIZE,
        //     },
        //   });
        // }}
        totalPages={
          data?.questions.total
            ? Math.ceil(data?.questions.total / PAGE_SIZE)
            : 1
        }
      />
    </Container>
  );
}
