import { Footer } from "./components/UnchangedComponents/Footer.jsx";
import NavBar from "./components/UnchangedComponents/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { PossessionsList } from "./components/PossessionsList/PatrimonyTable.jsx";
import './App.css'
import PatrimonyValue from "./components/PatrimonyValue/PatrimonyValue.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path='/possession' element = {
              <main className="main">
                <PossessionsList />
                <PatrimonyValue />
              </main>
              } 
            />
            <Route path='/patrimoine' element = {null} />
            <Route path='/possession/edit' element = {null} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
