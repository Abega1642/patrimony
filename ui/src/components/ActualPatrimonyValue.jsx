import { useState, useEffect } from "react";
import Flux from "../../../models/possessions/Flux.js"; // Assure-toi que ces imports sont corrects
import Possession from "../../../models/possessions/Possession.js";
import Patrimoine from "../../../models/Patrimoine.js";

function ActualPatrimonyValue() {
    const [patrimony, setPatrimony] = useState(new Patrimoine("", []));
    const [evaluationDate, setEvaluationDate] = useState(new Date());

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3001/api/data');
                const result = await response.json();

                if (result.status === 'OK') {
                    const possessions = result.data.data[1].data.possessions.map(possessionData => {
                        const numParams = Object.keys(possessionData).length;
                        const isFlux = numParams === 8;
                        if (isFlux) {
                            
                            const anw = new Flux(
                                possessionData.possesseur,
                                possessionData.libelle,
                                possessionData.valeurConstante,
                                new Date(possessionData.dateDebut),
                                new Date(possessionData.dateFin),
                                possessionData.tauxAmortissement,
                                possessionData.jour
                            );
                            return anw
                            
                        } else {
                            return new Possession(
                                possessionData.possesseur,
                                possessionData.libelle,
                                possessionData.valeur,
                                new Date(possessionData.dateDebut),
                                new Date(possessionData.dateFin),
                                possessionData.tauxAmortissement
                            );
                        }
                    });
                    setPatrimony(new Patrimoine(result.data.data[1].data, possessions))
                    
                } else {
                    console.error('Erreur lors de la lecture des données');
                }
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
            }
        }

        fetchData();
    }, []);

    const handleDateChange = (e) => {
        setEvaluationDate(new Date(e.target.value));
    };

    return (
        <>  
            <section className="brd-styled">
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

            <section className="brd-styled">
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

export default ActualPatrimonyValue;
