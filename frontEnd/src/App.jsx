import { Footer } from "./components/Footer";
import NavBar from "./components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { StyledTable } from "./components/Test.jsx";


function App() {

  return (
    <>
      <NavBar/>
      <main>
      <StyledTable />
      </main>
      <Footer/>
    </>
  )
}

export default App
