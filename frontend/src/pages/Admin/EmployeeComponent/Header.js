import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-light">Employee DashBoard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/add" className="text-light">Add Employee</Nav.Link>
            <Nav.Link as={Link} to="/view-all" className="text-light">View All Employees</Nav.Link>
            <Nav.Link as={Link} to="/report" className="text-light">Report Generate</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;