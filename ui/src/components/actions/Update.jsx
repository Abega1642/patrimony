import { useEffect, useState } from "react";
import { Inputs } from "./Inputs";
import { BASE_URL } from "../../functions_constants/backendUrl";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdatePossession() {
    const { id } = useParams();
    const [libelle, setLibelle] = useState('');
    const [dateFIn, setDateFin] = useState(null);
    const navigation = useNavigate();

    const updatePossession = async () => {        
        try {
            let requestBody = {};

            if(dateFIn == null) {
                requestBody = {
                    "libelle" : libelle
                }
            } else {
                requestBody = {
                    "libelle": libelle,
                    "dateFin" : new Date(dateFIn)
                }
            }
            const response = await fetch(BASE_URL + '/possession/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (response.ok) {
                console.log(requestBody);
                console.log(BASE_URL + '/possession/' + id);
                
                
                setLibelle('');
                setDateFin(null)
    
                navigation("/possession");
            } else {
                console.error('Erreur lors de l\'ajout de la possession:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la possession:', error);
        }
    }

  return (
    <main className="main">
        <div className='container mb-8 w-m5 ext'>
            <div className='row'>
                <aside className='card col-md-6 offset-md-3 mt-5 ext1'>
                    <h3 className='text-center mt-3 text-primary'>
                        Éditer la description de votre possession
                    </h3>
                    <div className='card-body '>
                        <Inputs 
                            className={"gp-3"}
                            field={libelle} 
                            setField={setLibelle} 
                            type={"text"} 
                            label={"Libellé :"}
                            placeholder={"Nouvelle nom de la possession ..."}
                        />
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
                        <button 
                            className="btn btn-success m-3"
                            onClick={updatePossession}
                        >
                            Update
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </main>
  )
}

export default UpdatePossession