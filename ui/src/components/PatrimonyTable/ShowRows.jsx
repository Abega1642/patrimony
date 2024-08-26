export default function ShowRows({possesseur, possessions}) {
    return (
        <>
            <thead>
                <tr>
                    <th>Possesseur</th>
                    <th>Libellé</th>
                    <th>Valeur</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Taux d`Amortissement</th>
                    <th>Valeur actuel</th>
                </tr>
            </thead>
            <tbody>
                {console.log(possesseur)}
                {
                    possessions.map(pos => {
                        return (
                            <tr key={pos.libelle}>
                                <td>{possesseur}</td>
                                <td>{pos.libelle}</td>
                                <td>{pos.valeur}</td>
                                <td>{pos.dateDebut.toLocaleDateString()}</td>
                                <td>{pos.dateFin.toLocaleDateString()}</td>
                                <td>{pos.tauxAmortissement}</td>
                                <td>{Math.abs(pos.getValeur(new Date()))}</td>
                            </tr>
                        )
                    }) 
                }     
            </tbody>
        </>
    )
}