import Link from "next/link";
import Image from "next/image";
import { useInput } from "../../../lib/hooks/useInput";
import { useEffect, useState } from "react";

export function NewQuestionForm(): JSX.Element | null {
  const question = useInput("");
  const alternatives = [useInput(""), useInput(""), useInput(""), useInput("")];

  const [invalidQuestion, setInvalidQuestion] = useState(false);
  const alternativeValidation = [
    useState(false),
    useState(false),
    useState(false),
    useState(false),
  ];

  function handleNewQuestion(): void {
    console.log(invalidQuestion);
    console.log(
      `${question.value} ${alternatives[0].value} ${alternatives[1].value}`
    );
    validateAlternatives();
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
    <div>
      <div className="card mb-3">
        <div className="card-header bg-secondary text-light">Nova Enquete</div>

        <div className="card-body pt-0 pb-0">
          <div className="mb-2 mt-2 row">
            <div className="col">
              <label className="mb-1 mt-1" htmlFor="question">
                Digite sua pergunta:
              </label>
              <input
                type="text"
                name="question"
                id="question"
                className={[
                  "form-control mb-1",
                  invalidQuestion ? "is-invalid" : "",
                ].join(" ")}
                placeholder="Pergunta"
                onBlur={validateQuestion}
                {...question}
              />
              {invalidQuestion && (
                <div className="invalid-feedback">
                  A pergunta de conter no mínimo 5 caracteres.
                </div>
              )}
            </div>
          </div>

          <div className="mb-2 mt-2 row">
            <div className="col">
              <label className="mb-1 mt-1" htmlFor="alternative">
                Alternativas:
              </label>
              {renderAlternatives()}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="col">
            <label className="mb-1 mt-1" htmlFor="data">
              A enquete encerra em:
            </label>
            <input
              type="datetime-local"
              className="form-control text-muted"
              name="data"
            />
          </div>
        </div>
      </div>

      <div className="m-2 row">
        <div className="col d-flex justify-content-center">
          <Link href="/#" passHref>
            <button
              type="button"
              className="btn btn-secondary btn-sm w-25 mx-2"
            >
              Cancelar
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-secondary btn-sm w-25 mx-2"
            onClick={handleNewQuestion}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
