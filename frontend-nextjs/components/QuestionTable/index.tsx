import { Pagination } from "./Pagination";
import { Question } from "./Question";

const questionList = [
  {
    title: "Quem irá vencer as eleições de 2022 no Brasil?",
    choices: ["Lula", "Bolsonaro", "Moro", "Nenhum deles"],
    expiration: new Date(2020, 1, 1),
  },
  {
    title: "Bitcoin chegará a US$100.000,00 até final de 2022?",
    choices: ["Sim", "Não"],
    expiration: new Date(2020, 1, 1),
  },
  {
    title: "Bitcoin chegará a US$100.000,00 até final de 2022?",
    choices: ["Sim", "Não"],
    expiration: new Date(2020, 1, 1),
  },
  {
    title: "Quem irá vencer as eleições de 2022 no Brasil?",
    choices: ["Lula", "Bolsonaro", "Moro", "Nenhum deles"],
    expiration: new Date(2020, 1, 1),
  },
];

export function QuestionTable(): JSX.Element | null {
  const groupSize = 2;
  const questionsElement = questionList
    .map((question, index) => {
      return (
        <div
          key={index}
          className={
            index % 2 == 0 ? "col-12 col-lg-6 mb-3" : "col-12 col-lg-6"
          }
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

  return <div className="container">{questionsElement}</div>;
}
