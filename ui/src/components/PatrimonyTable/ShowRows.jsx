export default function ShowRows(data) {
    return (
                data.possessions.map(pos => {
                    return (
                        <tr key={pos.libelle}>
                            <td>{data.possesseur.possesseur.nom}</td>
                            <td>{pos.libelle}</td>
                            <td>{pos.valeur}</td>
                            <td>{pos.dateDebut.toLocaleDateString()}</td>
                            <td>{pos.dateFin.toLocaleDateString()}</td>
                            <td>{pos.tauxAmortissement}</td>
                            <td>{Math.abs(pos.getValeur(new Date()))}</td>
                        </tr>
                    )
                })      
    )
}