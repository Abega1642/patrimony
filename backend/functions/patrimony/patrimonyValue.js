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
    
    let possessions = possessionsData.map(possessionData => {
        const numParams = Object.keys(possessionData).length;
        const isFlux = (numParams === 8);
        if (isFlux) {
            
            const anw = new Flux(
                possessionData.possesseur,
                possessionData.libelle,
                possessionData.valeurConstante,
                new Date(possessionData.dateDebut),
                possessionData.dateFin == null ? 
                null : new Date(possessionData.dateFin),
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
                possessionData.dateFin == null ? 
                null : new Date(possessionData.dateFin),
                possessionData.tauxAmortissement
            );
        }
    });

    possessions = possessions.sort((a,b) => a.dateDebut - b.dateDebut)
                                .filter(possession => {
                                    if (possession.dateFin == null || possession.dateFin > new Date(date))
                                    return possession
                                });
                                
    const Patrimony = new Patrimoine("", possessions);
    
    return (new Date(date) < possessions[0].dateDebut) ? 0 : Patrimony.getValeur(date);

}
