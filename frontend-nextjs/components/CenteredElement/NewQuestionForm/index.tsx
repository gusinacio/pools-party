import Link from "next/link";
import Image from "next/image";

export function NewQuestionForm(): JSX.Element | null {
    return (
        <div>
            <div className="card mb-3">
                <div className="card-header bg-secondary text-light">Nova Enquete</div>
            
                <div className="card-body pt-0 pb-0">
                    <div className="mb-2 mt-2 row">
                        <div className="col">
                            <label className="mb-1 mt-1" htmlFor="pergunta">Digite sua pergunta:</label>
                            <input
                                type="text"
                                name="pergunta"
                                className="form-control mb-3"
                                placeholder="Pergunta"/>
                        </div>
                    </div>
            
                    <div className="mb-2 mt-2 row">
                        <div className="col">
                            <label className="mb-1 mt-1" htmlFor="Alternativa">Alternativas:</label>
                            <input
                                type="text"
                                name="alternativa"
                                className="form-control mb-3"
                                placeholder="Alternativa #1"/>
                            <input
                                type="text"
                                name="alternativa"
                                className="form-control mb-3"
                                placeholder="Alternativa #2"
                                />
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
                    <button type="button" className="btn btn-secondary btn-sm w-25 mx-2">Enviar</button>
                </div>
            </div>
        </div>
    );
  }