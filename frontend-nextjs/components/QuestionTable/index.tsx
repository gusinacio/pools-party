import { Pagination } from "./Pagination";
import { Question } from "./Question";

export function QuestionTable(): JSX.Element | null {
  let serviceObjs: string[] = [];
  let result = [];
  for (let i = 0; i < serviceObjs.length; i += 2)
    result.push(serviceObjs.slice(i, i + 2));
  let finalResult = [];
  for (const tuple of result) {
    finalResult.push(<div className="row">{tuple}</div>);
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <Question />
        </div>

        <div className="col">
          <Question />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Question />
        </div>

        <div className="col">
          <Question />
        </div>
      </div>
      <div className="row mt-3">
        <Pagination currentPage={10} totalPages={10} />
      </div>
    </div>
  );
}
