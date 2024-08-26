import { useState, useEffect } from "react";
import Patrimoine from "../../../../models/Patrimoine.js";
import { fetchData } from "../UnchangedComponents/function/fetchData.js";

function PatrimonyValue() {
    const [patrimony, setPatrimony] = useState(new Patrimoine("", []));
    const [evaluationDate, setEvaluationDate] = useState(new Date());

    useEffect(() => {
        fetchData(setPatrimony);
    }, []);

    const handleDateChange = (e) => {
        setEvaluationDate(new Date(e.target.value));
    };

    return (
        <>  
            <section id="actualValue" className="brd-styled">
                <h2 className="text-center my-6 text-primary">
                    Évaluez la Puissance de Votre Patrimoine
                </h2>
                <div className="ml-7 mt-5">
                    <p className="lead">
                    En ce jour précieux du{" "}
                    <span className="fw-bold">
                        {new Date().toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        })}
                    </span>
                    , découvrez la valeur de votre patrimoine :
                    </p>
                    <form className="d-flex align-items-center p-3 shadow-sm rounded">
                        <div className="form-group me-3">
                            <label
                            htmlFor="patrimonyValue"
                            className="form-label values fw-bold fs-5"
                            >
                            Valeur :
                            </label>
                        </div>
                        <div className="form-group vlu">
                            <input
                            className="form-control w-mx shadow text-primary fs-5 fs-bolder"
                            type="text"
                            value={patrimony.getValeur(new Date()) + " Ar"}
                            readOnly
                            />
                        </div>
                    </form>
                </div>
                <br />
            </section>

            <section id="futurValue" className="brd-styled">
                <h2 className="text-center my-6 text-primary">Évaluez Votre Patrimoine à la Date de Votre Choix</h2>
                <div className="ml-7 mt-5">
                    <form>
                        <label className="form-label">
                            Veuillez sélectionner la date à laquelle vous souhaitez évaluer la valeur de votre patrimoine :
                        </label>
                        <input
                            className="form-control w-mx shadow-sm"
                            type="date"
                            name="evaluationDate"
                            id="date"
                            onChange={handleDateChange}
                        />
                    </form>
                    
                    <div className="mt-4 p-3 rounded shadow-sm bg-light">
                        <h3 className="mb-3">Évaluation pour :</h3>
                        <p className="mb-2">
                            Le jour du{" "}
                            <strong>
                                {evaluationDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </strong>
                            :
                        </p>
                        <form className="d-flex align-items-center p-3 shadow-sm rounded">
                            <label className="form-label m-1">
                                Valuer :
                            </label>
                            <input 
                                className="form-control w-mx shadow-sm text-primary fs-5 fs-bolder" 
                                type="text" value={patrimony.getValeur(evaluationDate) + " Ar"} 
                                readOnly />
                        </form>
                    </div>
                </div>
                <br />
            </section>

        </>
    );
}

export default PatrimonyValue;
