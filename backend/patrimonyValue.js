
async function getPatrimonyValue() {
    const datas = await read('../data/data.json').json();
    const possessions = datas.data.data[1].data.possessions.map(possessionData => {
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
}

