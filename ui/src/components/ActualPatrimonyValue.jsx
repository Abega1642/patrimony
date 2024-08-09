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
                <h2 className="text-center">Évaluez la Puissance de Votre Patrimoine</h2>
                <div className="ml-7 mt-5">
                En ce jour précieux du   
                    {" " + new Date()
                        .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) + " "} :
                <form className="d-flex align-items-center">
                    <div className="form-group me-3">
                        <label htmlFor="patrimonyValue" className="form-label">Valeur :</label>
                    </div>
                    <div className="form-group flex-grow-1">
                        <input 
                            className="form-control w-mx" 
                            type="text" 
                            value={patrimony.getValeur(new Date()) + " Ar"}
                            readOnly
                        />
                    </div>
                </form>
                </div>

            </section>
            <form className="ml-7 mt-5">
                <label>
                    Veuillez selectionner la date à laquelle vous souhaitez évaluer la valeur de votre patrimoine :
                </label>
                <input
                    className="form-control w-mx"
                    type="date" 
                    name="evaluationDate" 
                    id="date" 
                    onChange={handleDateChange}
                />
                <div className="ml-7 mt-5">
                    La valeur de votre patrimoine pour le jour du
                    {" " + evaluationDate
                        .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) + " "} :
                    <input className="form-control w-mx" type="text" value={patrimony.getValeur(evaluationDate) + " Ar"}/>

            </div>
            <div>
                {patrimony.possessions.map(e => <li key={crypto.randomUUID()}>{e.getValeur(evaluationDate)}</li>)}
            </div>
            </form>
        </>
    );
}

export default ActualPatrimonyValue;
