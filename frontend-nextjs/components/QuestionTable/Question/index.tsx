import { Choice } from "./Choice";

interface Props {
  index: number;

  title: string;
  description?: string;
  choices: string[];
  expiration: Date;
  votes: number;
}

export function Question({
  title,
  choices,
  index,
  description,
  expiration,
  votes,
}: Props): JSX.Element {
  function onHover() {}
  function onLeave() {}

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
      <div
        className="card mb-3 h-100"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="card-header bg-secondary text-white">
          pergunta #{index}
        </div>
        <div className="card-body fixed-height">
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
      {/* <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={toastRef}
        >
          <div className="toast-header">
            <strong className="me-auto">pergunta #{index}</strong>
            <small>{timeLeftString}</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Total de votos: {votes}
            <br />
            {seconds < 0 ? "Resultado final: " : null}
          </div>
        </div>
      </div> */}
    </>
  );
}
