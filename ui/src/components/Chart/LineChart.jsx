import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { BASE_URL } from '../../functions_constants/backendUrl';

function LineChart() { 
    const [datas, setDatas] = useState([]);
    const [startDate, setStart] = useState(new Date());
    const [endDate, setEnd] = useState(new Date());
    const [day, setDay] = useState(1);

    useEffect(() => {
        async function fetchDatas() {
            try {
                const post = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "month",
                        start: new Date(startDate).toISOString(),
                        end: new Date(endDate).toISOString(),
                        day: day
                    })
                };

                let response = await fetch(BASE_URL + '/patrimoine/range', post);

                if (response.ok) {
                    let result = await response.json();

                    console.log(result.patrimony_values)
                    if (result.patrimony_values && Array.isArray(result.patrimony_values)) {
                        setDatas(result.patrimony_values);
                    } else {
                        console.warn('Format des données inattendu:', result);
                    }
                } else {
                    console.error('Erreur de réponse:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        }

        if (startDate && endDate && day) {
            fetchDatas();
        }
    }, [startDate, endDate, day]);

    const data = {
        labels: datas.map((_, index) => `Point ${index + 1}`),
        datasets: [
            {
                label: 'Valeurs de patrimoine',
                data: datas,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <>
            <div className='card col-md-6 offset-md-3 mt-5'>
                <h3>Observer l`évolution de votre patrimoine</h3>
                <form >
                    <div>
                        <label >Sélectionner le début de l`évolution</label>
                        <input 
                            type="date" 
                            name="dateDébut" 
                            id="dateDebut"
                            onChange={e => setStart(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Sélectionner la fin de l`évolution</label>
                        <input 
                            type="date" 
                            name="dateDébut" 
                            id="dateDebut"
                            onChange={e => setEnd(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Entrer un jour d'évolution</label>
                        <input 
                            type="text" 
                            name="day" 
                            placeholder='15'
                            onChange={e => setDay(Number.parseInt(e.target.value))}
                        />
                    </div>
                </form>
                {}
            </div>
            <div className='card col-md-6 offset-md-3 mt-5'>
                <h3>Graphique en ligne des valeurs de patrimoine</h3>
                <div className='chart-container'>
                    <Line data={data} />
                </div>
            </div>
        </>
    );
}

export default LineChart;
