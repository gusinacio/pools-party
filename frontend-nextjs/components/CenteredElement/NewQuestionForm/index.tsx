import Link from "next/link";
import Image from "next/image";
import { useInput } from "../../../lib/hooks/useInput";
import { useState } from "react";

export function NewQuestionForm(): JSX.Element | null {
    const question = useInput("");
    const alternative = useInput("");
    const alternative2 = useInput("");

    const [invalidQuestion, setInvalidQuestion] = useState(false);
    const [invalidAlternative, setInvalidAlternative] = useState(false);
    const [invalidAlternative2, setInvalidAlternative2] = useState(false);

    function handleNewQuestion(): void {
        console.log(invalidQuestion);
        console.log(invalidAlternative)
        console.log(invalidAlternative2)
        console.log(`${question.value} ${alternative.value} ${alternative2.value}`);
    }

    function validateQuestion(): void {
        setInvalidQuestion(question.value.length < 5);
    }
    function validateAlternative(): void {
        setInvalidAlternative(alternative.value.length < 1);
    }
    function validateAlternative2(): void {
        setInvalidAlternative2(alternative2.value.length < 1);
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="card-header bg-secondary text-light">Nova Enquete</div>
            
                <div className="card-body pt-0 pb-0">
                    <div className="mb-2 mt-2 row">
                        <div className="col">
                            <label className="mb-1 mt-1" htmlFor="question">Digite sua pergunta:</label>
                            <input
                                type="text"
                                name="question"
                                id="question"
                                className={["form-control mb-1",
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
                            <label className="mb-1 mt-1" htmlFor="alternative">Alternativas:</label>
                            <input
                                type="text"
                                name="alternative"
                                id="alternative"
                                className={["form-control mb-1",
                                invalidAlternative ? "is-invalid" : "",
                                ].join(" ")}
                                placeholder="Alternativa #1"
                                onBlur={validateAlternative}
                                {...alternative}
                                />
                            {invalidAlternative && (
                                <div className="invalid-feedback">
                                    O campo não pode ficar vazio.
                                </div>
                            )}

                            <input
                                type="text"
                                name="alternativa"
                                id="alternative2"
                                className={["form-control mb-1",
                                invalidAlternative2 ? "is-invalid" : "",
                                ].join(" ")}
                                placeholder="Alternativa #2"
                                onBlur={validateAlternative2}
                                {...alternative2}
                                />
                            {invalidAlternative2 && (
                                <div className="invalid-feedback">
                                    O campo não pode ficar vazio.
                                </div>
                            )}
                        </div>
                    </div>
            
                    <div className="mb-2 row">
                        <div className="col d-flex justify-content-end">
                            <button className="border-0 bg-transparent">
                                <Image
                                    src="/add-icon.png"
                                    className="rounded-circle"
                                    alt="+"
                                    height={25}
                                    width={25}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="col">
                        <label className="mb-1 mt-1" htmlFor="data">A enquete encerra em:</label>
                        <input type="datetime-local" className="form-control text-muted" name="data"/>
                    </div>
                </div>
            </div>

            <div className="m-2 row">
                <div className="col d-flex justify-content-center">
                    <Link href="/#" passHref>
                        <button type="button" className="btn btn-secondary btn-sm w-25 mx-2">Cancelar</button>
                    </Link>
                    <button type="button" className="btn btn-secondary btn-sm w-25 mx-2" onClick={handleNewQuestion}>Enviar</button>
                </div>
            </div>
        </div>
    );
  }