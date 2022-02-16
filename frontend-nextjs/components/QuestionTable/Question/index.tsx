import { Choice } from "./Choice";

interface Props {
  index: number;

  title: string;
  description?: string;
  choices: string[];
  expiration: Date;
}

export function Question({title, choices, index, description} : Props): JSX.Element {

  const choiceElement = choices.map((choice, index) => {
    return <Choice key={index} choice={choice} />
  });

  return (
    <div className="card mb-3">
      <div className="card-header">Pergunta #{index}</div>
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
        {description && <p className="card-text">{description}</p>}
        <div className="col ">
          {choiceElement}
        </div>
      </div>
      <div className="card-footer text-muted">2 days ago</div>
    </div>
  );
}
