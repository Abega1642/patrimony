import { useNavigate } from "react-router-dom";

function AddPossessionSection() {
    const navigation = useNavigate();

    const handleAddPossession = () => {
       navigation('/possession/add')
    };

    return (
        <section id="addPossessionSection" 
            className="brd-styled mt-5 pb-7 mb-7">
            <h3 className="text-center my-3 text-primary">
                Ajoutez une Nouvelle Possession
            </h3>
            <p className="lead text-center">
                Enregistrez une nouvelle possession dans votre patrimoine pour suivre
                l`évolution de sa valeur et mieux gérer vos biens.
            </p>
            <div className="text-center mt-4">
                <button
                    className="btn btn-success shadow-sm"
                    onClick={handleAddPossession}
                >
                    Ajouter une possession
                </button>
            </div>
        </section>
    );
}

export default AddPossessionSection;
