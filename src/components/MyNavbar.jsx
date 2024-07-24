import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import headerLogo from "../assets/images/BAGBBUNNY.png"; // Cambia l'estensione se necessario
import hamburgerIcon from "../assets/icons/hamburger.svg"; // Cambia l'estensione se necessario
import { Link, useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={headerLogo}
            alt="logo"
            width={129}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <img
            src={hamburgerIcon}
            alt="hamburger icon"
            width={25}
            height={25}
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">Prodotti</Nav.Link>
            <Nav.Link href="/about">Chi siamo</Nav.Link>
            <Nav.Link href="/contact">Contatti</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {authToken ? (
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Profilo"
                menuVariant="dark"
                className="underLine2 mt-2"
              >
                <NavDropdown.Item as={Link} to="/dashboardUtente">
                  I miei ordini
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link to="/login" className="underLine2">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
