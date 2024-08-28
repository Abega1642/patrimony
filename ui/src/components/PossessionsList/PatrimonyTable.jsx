import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { BASE_URL } from '../../functions_constants/backendUrl.js';

export function PossessionsList() {
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        async function fetchDatas() {
            try {
                const response = await fetch(BASE_URL + '/possession');
                const data = await response.json();
                setPossessions(data);
            } catch (error) {
                console.error('Erreur lors du fetch des possessions:', error);
            }
        }
        fetchDatas();
    }, []);

    return (
        <>
            <h2 className="text-center my-6 text-primary">
                Liste de votre patrimoine
            </h2>
            <Table striped bordered hover className="mt-5 mg-x" id='possession'>
                <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>Valeur</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Taux d`Amortissement</th>
                        <th>Valeur actuelle</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        possessions.map((element, ind) => (
                            <tr key={ind}>
                                <td>{element.libelle}</td>
                                <td>{element.valeur}</td>
                                <td>{new Date(element.dateDebut).toLocaleDateString()}</td>
                                <td>{new Date(element.dateFin).toLocaleDateString()}</td>
                                <td>{element.tauxAmortissement}</td>
                                <td>{Math.abs(element.actualValue)}</td>
                                <td>
                                    <Button 
                                        variant="primary" 
                                        size="sm" 
                                        onClick={() => null }
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() =>  null}
                                    >
                                        Close
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}
