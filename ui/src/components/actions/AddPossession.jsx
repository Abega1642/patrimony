import { useState } from "react";
import { Inputs } from "./Inputs";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { useNavigate } from "react-router-dom";

function AddPossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(null);
    const [tauxAmortissement, setTauxAmortissement] = useState('');
    const navigation = useNavigate();

    const addPossession = async () => {
        let possession = {
            "possesseur": {
                        "nom": "John Doe"
                    },
            "libelle": libelle,
            "valeur": Number.parseFloat(valeur),
            "dateDebut": dateDebut,
            "dateFin": dateFin,
            "tauxAmortissement": Number.parseFloat(tauxAmortissement)
        }
        
        try {
            const response = await fetch(BASE_URL + '/possession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(possession)
            });
            
            if (response.ok) {
                setLibelle('');
                setValeur(0);
                setDateDebut(new Date());
                setDateFin(null);
                setTauxAmortissement(0);
                navigation("/possession");
            } else {
                console.error('Erreur lors de l\'ajout de la possession:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la possession:', error);
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <aside className='card col-md-6 offset-md-3 mt-5'>
                <h3 className='text-center mt-3'>
                    Ajouté une nouvelle possession
                </h3>
                <div className='card-body '>
                    <Inputs 
                        className={"gp-3"}
                        field={libelle} 
                        setField={setLibelle} 
                        type={"text"} 
                        label={"Libellé :"}
                        placeholder={"Nom de la possession ..."}
                    />
                    <Inputs 
                        className={"gp-3"}
                        field={valeur} 
                        setField={setValeur} 
                        type={"text"} 
                        label={"Valeur :"}
                        placeholder={"Valeur de la possession ... Exemple : 100005.4865"}
                    />
                    <div>
                        <label >Date de commencement</label>
                        <input
                            className="form-control w-mx shadow-sm gp-3"
                            type="date"
                            name="evaluationDate"
                            id="date"
                            onChange={(e) => setDateDebut(new Date(e.target.value))}
                        />
                    </div>
                    <div>
                    <label >Date de fin</label>
                        <input
                            className="form-control w-mx shadow-sm gp-3"
                            type="date"
                            name="evaluationDate"
                            id="date"
                            onChange={(e) => setDateFin(new Date(e.target.value))}
                        />
                    </div>
                    <Inputs 
                        field={tauxAmortissement} 
                        setField={setTauxAmortissement} 
                        type={"text"}
                        label={"Taux d'amortissement :"}
                        placeholder={"Taux d'amotissement... Ex : -5.785 ou bien 12.5"}
                    />
                </div>
                <button 
                    className="btn btn-success m-3"
                    onClick={addPossession}
                >
                    Add
                </button>
            </aside>

        </div>
    </div>
  )
}

export default AddPossession