import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/images/BAGBBUNNY.png";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
const MyNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const cartItems = useSelector(state => state.cart.cart);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleSearch = event => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
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
            <Nav.Link as={Link} to="/products">
              Prodotti
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Chi siamo
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contatti
            </Nav.Link>
          </Nav>
          <Form className="d-flex ms-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Cerca prodotti"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Cerca
            </Button>
          </Form>
          <Nav className="mb-2 mx-2">
            {authToken ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboardUtente"
                  className="underLine2 mt-2"
                >
                  <Badge badgeContent={cartItems} color="success">
                    <ShoppingCartIcon />
                  </Badge>
                </Nav.Link>
                <NavDropdown
                  id="nav-dropdown-dark-example1"
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
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="underLine2">
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
