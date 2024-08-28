import { Footer } from "./components/UnchangedComponents/Footer.jsx";
import NavBar from "./components/UnchangedComponents/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { PossessionsList } from "./components/PossessionsList/PossessionList.jsx";
import './App.css'
import PatrimonyValue from "./components/PatrimonyValue/PatrimonyValue.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddPossession from "./components/actions/AddPossession.jsx";
import AddPossessionSection from "./components/addPossessionSection/AddPossessionSection.jsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path='/possession' element = {
              <main className="main">
                <PossessionsList />
                <AddPossessionSection />
                <PatrimonyValue />
              </main>
              } 
            />
            <Route path='/patrimoine' element = {null} />
            <Route path='/possession/add' element = {<AddPossession/>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
