import Flux from "../../../../../models/possessions/Flux";
import Possession from "../../../../../models/possessions/Possession";
import Patrimoine from "../../../../../models/Patrimoine";

export async function fetchData(setPatrimony) {
    try {
        const response = await fetch('http://localhost:3001/possession');
        const result = await response.json();

        if (result.status === 'OK') {
            const possessions = result.data.data[1].data.possessions.map(possessionData => {
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
            setPatrimony(new Patrimoine(result.data.data[1].data, possessions))
            
            
        } else {
            console.error('Erreur lors de la lecture des données');
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
}