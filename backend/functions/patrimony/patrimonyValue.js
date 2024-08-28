import Possession from '../../../models/possessions/Possession.js'
import Flux from '../../../models/possessions/Flux.js'
import Patrimoine from '../../../models/Patrimoine.js'
import getAllPossessions from '../possessions/getAllPossessions.js';

export async function getPatrimonyValueNow() {

    const possessionsData = await getAllPossessions();
    
    const possessions = possessionsData.map(possessionData => {
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
    });
    const Patrimony = new Patrimoine("", possessions)
    return Patrimony.getValeur(new Date())
}

export async function getPatrimonyValueByDate(date) {

    const possessionsData = await getAllPossessions();
    
    const possessions = possessionsData.map(possessionData => {
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
    });

    const Patrimony = new Patrimoine("", possessions);

    return Patrimony.getValeur(date);

}
