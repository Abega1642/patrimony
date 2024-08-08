import { Table } from 'react-bootstrap';
import '../../../data/data.json'
import { readFile } from '../../../data/index.js';
import { useState } from 'react';
import { useEffect } from 'react';


export function Tables() {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const result = await readFile('../../../data/data.json');
            if (result.status === 'OK') {
                console.log('Données lues:', result.data);
                setData(result.data);
            } else {
                console.error('Error reading file:', result.error);
            }
            
        }
        fetchData();
    }, [])

    return (
        <Table striped bordered hover className="mt-5">
        
        </Table>
    );
}

