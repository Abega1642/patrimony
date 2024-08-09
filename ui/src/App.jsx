import { Footer } from "./components/Footer.jsx";
import NavBar from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tables } from "./components/Tables.jsx";
import './App.css'
import PatrimonyValue from "./components/PatrimonyValue.jsx";


function App() {

  return (
    <>
      <NavBar/>
      <main className="main">
        <Tables />
        <PatrimonyValue />
      </main>
      <Footer/>
    </>
  )
}

export default App
