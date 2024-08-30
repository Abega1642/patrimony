import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { BASE_URL } from '../../functions_constants/backendUrl';
import getMonthlyDates from '../../functions_constants/chartAbcisse';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaChartLine, FaCalendarDay, FaCalendarAlt, FaSearch } from 'react-icons/fa';

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
        <Container fluid className='py-5' style={{ backgroundColor: '#f9f9f9' }}>
            <Row className='mb-4'>
                <Col md={12} lg={6} className='mx-auto'>
                    <Card className='shadow-lg rounded-lg border-0 mb-4'>
                        <Card.Body>
                            <h3 className='text-center mb-4 text-primary'>
                                <FaChartLine className='me-2' />
                                Graphique des Valeurs de Patrimoine
                            </h3>
                            <div className='bg-white p-4 rounded shadow-sm'>
                                <Line data={data} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mb-4'>
                <Col md={12} lg={6} className='mx-auto'>
                    <Card className='shadow-lg rounded-lg border-0 mb-4'>
                        <Card.Body>
                            <h3 className='text-center mb-4 text-primary'>
                                <FaCalendarAlt className='me-2' />
                                Observer l`Évolution de Votre Patrimoine
                            </h3>
                            <Form>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='d-flex align-items-center'>
                                        <FaCalendarDay className='me-2 text-primary' />
                                        Sélectionner le début de l`évolution
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateDebut"
                                        id="dateDebut"
                                        onChange={e => setStart(new Date(e.target.value))}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='d-flex align-items-center'>
                                        <FaCalendarDay className='me-2 text-primary' />
                                        Sélectionner la fin de l`évolution
                                    </Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dateFin"
                                        id="dateFin"
                                        onChange={e => setEnd(new Date(e.target.value))}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4'>
                                    <Form.Label className='d-flex align-items-center'>
                                        <FaSearch className='me-2 text-primary' />
                                        Entrer un jour d\évolution
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="day"
                                        placeholder='15'
                                        onChange={e => setDay(Number.parseInt(e.target.value))}
                                    />
                                </Form.Group>
                                <div className='text-center'>
                                    <Button
                                        variant="primary"
                                        className='shadow-sm'
                                        onClick={getCurve}
                                    >
                                        <FaSearch className='me-2' />
                                        Voir l`Évolution
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LineChart;
