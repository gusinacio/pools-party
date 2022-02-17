import { Pagination } from "./Pagination";
import { Question } from "./Question";

const questionList = [
  {
    title: "Quem irá vencer as eleições de 2022 no Brasil?",
    choices: ["Lula", "Bolsonaro", "Moro", "Nenhum deles"],
    expiration: new Date(2022, 9, 30),
    votes: 890,
  },
  {
    title: "Bitcoin chegará a US$100k até final de 2022?",
    choices: ["Sim", "Não"],
    expiration: new Date(2022, 11, 30),
    votes: 1023,
  },
  {
    title: "O grupo #9 vai receber nota 10 no AG2?",
    choices: ["Sim", "Claro", "Com certeza", "Isso é uma pergunta?"],
    expiration: new Date(2022, 1, 18),
    votes: 2,
  },
  {
    title: "Quem irá vencer as eleições de 2022 no Brasil?",
    choices: ["Lula", "Bolsonaro", "Moro", "Nenhum deles"],
    expiration: new Date(2020, 1, 1),
    votes: 2432,
  },
];

export function QuestionTable(): JSX.Element | null {
  const groupSize = 2;
  const questionsElement = questionList
    .map((question, index) => {
      return (
        <div
          key={index}
          className={[
            "col-12 col-lg-6",
            index % 2 == 0 ? "mb-3 mb-lg-0" : "",
          ].join(" ")}
        >
          <Question key={index} index={index + 1} {...question} />
        </div>
      );
    })
    .reduce<JSX.Element[][]>((r, element, index) => {
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, [])
    .map((row, index) => (
      <div className="row mt-3" key={index}>
        {row}
      </div>
    ));

  return (
    <div className="container">
      {questionsElement}
      <Pagination currentPage={1} totalPages={10} />
    </div>
  );
}
