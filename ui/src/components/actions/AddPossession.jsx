import { useState } from "react";
import { Inputs } from "./Inputs";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { useNavigate } from "react-router-dom";
import FluxRadio from "./FluxRadio";
import requestBody from "./correspondingRequestBody";

function AddPossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState(new Date());
    const [type, setType] = useState("Autres");
    const [jour, setJour] = useState(1)
    const [tauxAmortissement, setTauxAmortissement] = useState(0);
    const navigation = useNavigate();

    function handleTypeChange(e) {
        setType(e.target.value);   
    }

    function isChecked(str) {
        return type === str
    }

    const addPossession = async () => {        
        try {
            const response = await fetch(BASE_URL + '/possession', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody( 
                    type,  
                    libelle,  
                    valeur,  
                    dateDebut,  
                    tauxAmortissement, 
                    jour)
                )
            });
            
            if (response.ok) {
                setLibelle('');
                setValeur(0);
                setDateDebut(new Date());
                setTauxAmortissement(0);
                setType("Autres");
                setJour(1);
                
                navigation("/possession");
            } else {
                console.error('Erreur lors de l\'ajout de la possession:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la possession:', error);
        }
    }

  return (
    <div className='container mb-8 w-m5'>
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
                        placeholder={"Valeur de la possession ... Ex : 100005.4865"}
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
                    <Inputs 
                        field={tauxAmortissement} 
                        setField={setTauxAmortissement} 
                        type={"text"}
                        label={"Taux d'amortissement :"}
                        placeholder={"Taux d'amotissement... Ex : -5.785 ou bien 12.5"}
                    />
                    <div className="d-flex">
                        <FluxRadio checked={isChecked("Flux-entrant")} name={"Flux-entrant"} onChange={handleTypeChange} />
                        <FluxRadio checked={isChecked("Flux-sortant")} name={"Flux-sortant"} onChange={handleTypeChange} />
                        <FluxRadio checked={isChecked("Autres")} name={"Autres"} onChange={handleTypeChange} />
                    </div>
                        {type !== "Autres" && (
                                <div className='form-group mb-4'>
                                    <label className='form-label'>Entrer un jour d`entré ou du sortie du flux</label>
                                    <input 
                                        type="number" 
                                        name="day" 
                                        placeholder='15'
                                        className='form-control'
                                        onChange={e => setJour(Number.parseInt(e.target.value))}
                                    />
                                </div>
                            )
                        }
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