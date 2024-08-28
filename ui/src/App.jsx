import { Footer } from "./components/UnchangedComponents/Footer.jsx";
import NavBar from "./components/UnchangedComponents/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { PossessionsList } from "./components/PossessionsList/PatrimonyTable.jsx";
import './App.css'
import PatrimonyValue from "./components/PatrimonyValue/PatrimonyValue.jsx";


function App() {

  return (
    <>
      <NavBar/>
      <main className="main">
        <PossessionsList />
        <PatrimonyValue />
      </main>
      <Footer/>
    </>
  )
}

export default App
