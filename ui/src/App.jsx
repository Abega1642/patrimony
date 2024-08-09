import { Footer } from "./components/Footer.jsx";
import NavBar from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tables } from "./components/Tables.jsx";
import './App.css'
import ActualPatrimonyValue from "./components/ActualPatrimonyValue.jsx";


function App() {

  return (
    <>
      <NavBar/>
      <main className="main">
        <Tables />
        <ActualPatrimonyValue />
      </main>
      <Footer/>
    </>
  )
}

export default App
