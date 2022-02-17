import { Choice } from "./Choice";

interface Props {
  index: number;

  title: string;
  description?: string;
  choices: string[];
  expiration: Date;
}

export function Question({
  title,
  choices,
  index,
  description,
  expiration,
}: Props): JSX.Element {
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
    <div className="card mb-3 h-100">
      <div className="card-header bg-secondary text-white">
        pergunta #{index}
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
        {description && <p className="card-text">{description}</p>}
        <div className="d-flex h-100">
          <div className="row align-self-center w-100">
            <div className="col d-flex flex-column align-items-center">
              {choiceElement}
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted text-end">{timeLeftString}</div>
    </div>
  );
}
