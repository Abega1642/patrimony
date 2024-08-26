import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import {fetchData} from "../UnchangedComponents/function/fetchData.js";
import Patrimoine from '../../../../models/Patrimoine.js';
import ShowRows from './ShowRows.jsx';

export function PatrimonyTable() {
    const [patrimony, setPatrimony] = useState(new Patrimoine({}, []));
    useEffect(() => {
        fetchData(setPatrimony);        
    }, []);

    return (
    <>
        <h2 className="text-center my-6 text-primary">
                    Liste de votre patrimoine
        </h2>
        <Table striped bordered hover className="mt-5 mg-x" id='possession'>
            <ShowRows 
                possesseur={patrimony.possesseur.possesseur.nom} 
                possessions={patrimony.possessions} 
            />
        </Table>
    </>
    );
}
