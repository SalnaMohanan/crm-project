import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        {/* Left: Logo & Brand */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="" // Use the imported logo
            alt="CRM Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">Your CRM Name</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/features-pricing">Features & Pricing</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>

        {/* If inside Dashboard, show only Logout */}
        {/* {insideDashboard ? (
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="" className="  text-white px-3">
              Logout <i className="fa-solid fa-right-from-bracket ms-1"></i>
            </Nav.Link>
          </Nav>
        ) : (
          // Normal Navigation
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/features-pricing">Features & Pricing</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )} */}
      </Container>
    </Navbar>
  );
};

export default Header;
