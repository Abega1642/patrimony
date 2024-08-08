import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          Yε:rPatrimony
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#possession" className="me-3">
              Possession
            </Nav.Link>
            <Nav.Link href="#actualValue" className="me-3">
              Actual Value
            </Nav.Link>
            <Nav.Link href="#futurValue">
              Futur Value
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
