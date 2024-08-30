import { useState } from "react";
import { Inputs } from "./Inputs";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { useNavigate } from "react-router-dom";
import FluxRadio from "./FluxRadio";
import requestBody from "./correspondingRequestBody";
import { FaExclamationTriangle } from "react-icons/fa";

function AddPossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState(new Date());
    const [type, setType] = useState("Autres");
    const [jour, setJour] = useState(1);
    const [tauxAmortissement, setTauxAmortissement] = useState(0);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function handleTypeChange(e) {
        setType(e.target.value);   
    }

    function isChecked(str) {
        return type === str;
    }

    function validate() {
        const newErrors = {};
        if (!libelle) {
            newErrors.libelle = "Le libellé est obligatoire.";
        }
        if (!valeur) {
            newErrors.valeur = "La valeur est obligatoire.";
        } else if (isNaN(valeur)) {
            newErrors.valeur = "N'entrez que des chiffres (sans aucune lettre ni unité d'argent)";
        }
        if (tauxAmortissement && isNaN(tauxAmortissement)) {
            newErrors.tauxAmortissement = "N'entrez que des chiffres pour le taux d'amortissement";
        }
        if (type !== "Autres" && (jour < 1 || jour > 31)) {
            newErrors.jour = "Le jour doit être compris entre 1 et 31.";
        }
        setErrors(newErrors);
        
        setTimeout(() => setErrors({}), 3500);

        return Object.keys(newErrors).length === 0;
    }

    const addPossession = async () => {        
        if (!validate()) {
            return;
        }

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
                setValeur('');
                setDateDebut(new Date());
                setTauxAmortissement(0);
                setType("Autres");
                setJour(1);
                setErrors({});
                navigate("/possession");
            } else {
                console.error('Erreur lors de l\'ajout de la possession:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la possession:', error);
        }
    }

    return (
        <main className="main">
            <div className='container mb-8 w-m5'>
                <div className='row'>
                    <aside className='card col-md-6 offset-md-3 mt-5'>
                        <h3 className='text-center mt-3'>
                            Ajouté une nouvelle possession
                        </h3>
                        <div className='card-body '>
                            <div className="form-group">
                                <Inputs 
                                    className={"gp-3"}
                                    field={libelle} 
                                    setField={setLibelle} 
                                    type={"text"} 
                                    label={"Libellé :"}
                                    placeholder={"Nom de la possession ..."}
                                />
                                {errors.libelle && <div className="text-danger">
                                    <FaExclamationTriangle /> {errors.libelle}
                                </div>}
                            </div>
                            <div className="form-group">
                                <Inputs 
                                    className={"gp-3"}
                                    field={valeur} 
                                    setField={setValeur}
                                    type={"text"} 
                                    label={"Valeur :"}
                                    placeholder={"Valeur de la possession ... Ex : 100005.4865"}
                                />
                                {errors.valeur && <div className="text-danger">
                                    <FaExclamationTriangle /> {errors.valeur}
                                </div>}
                            </div>
                            <div>
                                <label>Date de commencement</label>
                                <input
                                    className="form-control w-mx shadow-sm gp-3"
                                    type="date"
                                    name="evaluationDate"
                                    id="date"
                                    onChange={(e) => setDateDebut(new Date(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <Inputs 
                                    className={"gp-3"}
                                    field={tauxAmortissement} 
                                    setField={setTauxAmortissement} 
                                    type={"text"}
                                    label={"Taux d'amortissement :"}
                                    placeholder={"Taux d'amotissement... Ex : -5.785 ou bien 12.5"}
                                />
                                {errors.tauxAmortissement && <div className="text-danger">
                                    <FaExclamationTriangle /> {errors.tauxAmortissement}
                                </div>}
                            </div>
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
                                        min="1" 
                                        max="31"
                                        value={jour}
                                        onChange={e => {
                                            const value = Number.parseInt(e.target.value);
                                            if (!isNaN(value) && value >= 1 && value <= 31) {
                                                setJour(value);
                                            }
                                        }}
                                    />
                                    {errors.jour && <div className="text-danger">
                                        <FaExclamationTriangle /> {errors.jour}
                                    </div>}
                                </div>
                            )}
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
        </main>
    )
}

export default AddPossession;
