import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export function Tables() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3001/api/data');
                const result = await response.json();

                if (result.status === 'OK') {
                    setData(result.data.data[1].data.possessions);
                } else {
                    console.error('Erreur lors de la lecture des données');
                }
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
            }
        }

        fetchData();
    }, []);

    return (
    <>
        <h2 className="text-center my-6 text-primary">
                    Liste de votre patrimoine
        </h2>
        <Table striped bordered hover className="mt-5 mg-x" id='possession'>
            <thead>
                <tr>
                    <th>Possesseur</th>
                    <th>Libellé</th>
                    <th>Valeur</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Taux d`Amortissement</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.possesseur.nom}</td>
                        <td>{item.libelle}</td>
                        <td>{item.valeur}</td>
                        <td>
                            {
                                new Date(item.dateDebut)
                                    .toLocaleDateString (
                                        {
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        }
                                    )
                            }
                        </td>
                        <td>{item.dateFin ? item.dateFin : 'Non définie'}</td>
                        <td>{item.tauxAmortissement}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    
    </>
    );
}
