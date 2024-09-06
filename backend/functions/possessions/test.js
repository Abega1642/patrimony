import Possession from "../../../models/possessions/Possession.js";
import Flux from "../../../models/possessions/Flux.js";
import getAllPossessions from "./getAllPossessions.js";

export default async function test(date) {
    const possessions = await getAllPossessions()

    const possessionsValues = possessions.map(possessionData => {
        const numParams = Object.keys(possessionData).length;
        const isFlux = (numParams === 8);
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
    }).map(possession => {
        return {
           "actualValue" : possession.getValeur(new Date(date))
        }
    });

    return possessions.map((possession, ind) => {
        return {... possession, ... possessionsValues[ind]}
        }
    ) 
}
