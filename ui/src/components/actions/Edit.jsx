import { useState } from "react";
import { Inputs } from "./Inputs";


function AddPossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState(0);
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(null);
    const [tauxAmortissement, setTauxAmortissement] = useState(0)

    const addPossession = () => {
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
        console.log(possession);
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
                        placeholder={"Valeur générale de la possession ..."}
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
                        placeholder={"Valeur générale de la possession ..."}
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