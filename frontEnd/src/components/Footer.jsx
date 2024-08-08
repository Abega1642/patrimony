import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <Row>
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Abegà Razafindratelo. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
