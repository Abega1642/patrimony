import { PossessionsList } from "../PossessionsList/PossessionList"
import AddPossessionSection from "../addPossessionSection/AddPossessionSection"

export default function PossessionPage() {
    return (
        <main className="main">
                <PossessionsList />
                <AddPossessionSection />
        </main>
    )
}