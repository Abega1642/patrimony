import { Footer } from "./components/UnchangedComponents/Footer.jsx";
import NavBar from "./components/UnchangedComponents/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { PossessionsList } from "./components/PossessionsList/PossessionList.jsx";
import './App.css'
import PatrimonyValue from "./components/PatrimonyValue/PatrimonyValue.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddPossession from "./components/actions/AddPossession.jsx";
import AddPossessionSection from "./components/addPossessionSection/AddPossessionSection.jsx";
import LineChart from "./components/Chart/LineChart.jsx";
import Dashboard from "./components/UnchangedComponents/Dashboard.jsx";


function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path={'/possession' || '/'} element = {
              <main className="main">
                <PossessionsList />
                <AddPossessionSection />
              </main>
              } 
            />
            <Route path='/patrimoine' element = {
              <main className="main">
                <Dashboard />
                <section className="ptr-section">
                  <div id="graph">
                    <LineChart />
                  </div>
                  <div id="values">
                    <PatrimonyValue />
                  </div>
              </section>
              </main>
            } />
            <Route path='/possession/create' element = {
                <AddPossession/>
              } 
            />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
