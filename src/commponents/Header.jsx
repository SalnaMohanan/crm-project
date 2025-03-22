



import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ insideDashboard }) => {
  const navigate = useNavigate();

  // Fetch user details from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");

  // Logout Function
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        {/* Left: Logo & Brand */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="" // Insert your logo URL
            alt="CRM Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">Your CRM Name</span>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        {!insideDashboard && <Navbar.Toggle aria-controls="basic-navbar-nav" />}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {insideDashboard ? (
              // Inside Dashboard: Show Profile Dropdown & Logout
              user ? (
                <Dropdown>
                  <Dropdown.Toggle variant="warning" className="text-dark px-3">
                    {user.username} ({role})
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Logout <i className="fa-solid fa-right-from-bracket ms-1"></i>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                // If no user found (fallback)
                <Nav.Link as={Link} to="/login" className="text-white px-3">
                  Login
                </Nav.Link>
              )
            ) : (
              // Normal Public Navigation (Outside Dashboard)
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/features-pricing">Features & Pricing</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
