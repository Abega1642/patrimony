import { Footer } from "./components/Footer.jsx";
import NavBar from "./components/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tables } from "./components/Tables.jsx";


function App() {

  return (
    <>
      <NavBar/>
      <main>
      <Tables />
      </main>
      <Footer/>
    </>
  )
}

export default App
