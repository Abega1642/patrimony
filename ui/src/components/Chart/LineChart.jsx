import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { BASE_URL } from '../../functions_constants/backendUrl';
import getMonthlyDates from '../../functions_constants/chartAbcisse';

function useDate(monthsAhead) {
    const [date, setDate] = useState(() => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + monthsAhead);
        return currentDate;
    });

    return [date, setDate];
}

function LineChart() { 
    
    const [values, setValues] = useState([]);
    const [startDate, setStart] = useDate(-2);
    const [endDate, setEnd] = useDate(3);    
    const [day, setDay] = useState(1);

    useEffect(() => {
        getCurve();
    }, [])

    const getCurve = async () => {
        console.log(endDate)
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
                if (result.patrimony_values && Array.isArray(result.patrimony_values)) {
                    setValues(result.patrimony_values);
                        
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

    const data = {
        labels: getMonthlyDates(startDate, endDate, day),
        datasets: [
            {
                label: 'Valeur de patrimoine',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    return (
        <section className='d-flex flex-wrap'>
            <div className='card col-md-6 offset-md-3 mt-5 p-4 shadow-lg'>
                <h3 className='text-center mb-4'>Graphique en ligne des valeurs de patrimoine</h3>
                <div className='chart-container bg-light p-3 rounded'>
                    <Line data={data} />
                </div>
            </div>      
            <div className='card col-md-6 offset-md-3 mt-5 p-4 shadow-lg'>
                <h3 className='text-center mb-4'>Observer l`évolution de votre patrimoine</h3>
                <form>
                    <div className='form-group mb-3'>
                        <label className='form-label'>Sélectionner le début de l`évolution</label>
                        <input 
                            type="date" 
                            name="dateDebut" 
                            id="dateDebut"
                            className='form-control'
                            onChange={e => setStart(e.target.value)}
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label'>Sélectionner la fin de l`évolution</label>
                        <input 
                            type="date" 
                            name="dateFin" 
                            id="dateFin"
                            className='form-control'
                            onChange={e => setEnd(e.target.value)}
                        />
                    </div>
                    <div className='form-group mb-4'>
                        <label className='form-label'>Entrer un jour d`évolution</label>
                        <input 
                            type="number" 
                            name="day" 
                            placeholder='15'
                            className='form-control'
                            onChange={e => setDay(Number.parseInt(e.target.value))}
                        />
                    </div>
                    <div className='text-center'>
                        <button 
                            type="button" 
                            className='btn btn-primary'
                            onClick={getCurve}>
                            Voir l`évolution
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default LineChart;
