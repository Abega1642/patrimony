import { Footer } from "./components/UnchangedComponents/Footer.jsx";
import NavBar from "./components/UnchangedComponents/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { PatrimonyTable } from "./components/PatrimonyTable/PatrimonyTable.jsx";
import './App.css'
import PatrimonyValue from "./components/PatrimonyValue/PatrimonyValue.jsx";


function App() {

  return (
    <>
      <NavBar/>
      <main className="main">
        <PatrimonyTable />
        <PatrimonyValue />
      </main>
      <Footer/>
    </>
  )
}

export default App
