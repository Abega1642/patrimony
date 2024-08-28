import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigation = useNavigate();

  function goToPatrimony() {
    navigation("/patrimoine");
  }

  function goToPossession() {
    navigation("/possession");
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          <i className="fa fa-bitcoin"></i>Yε:rPatrimony<i className="fa fa-dollar"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link c
              lassName="me-3"
              onClick={goToPossession}
            >
              Possessions
            </Nav.Link>
            <Nav.Link 
              className="me-3"
              onClick={goToPatrimony}
            >
              Patrimony
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
