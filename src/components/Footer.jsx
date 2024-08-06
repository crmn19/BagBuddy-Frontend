import React from "react";
import { Container, Row, Col, Image, Nav, Button } from "react-bootstrap";
import { BsYoutube, BsFacebook, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="mb-4">
          <Col className="text-center">
            <Link to="/">
              <Image
                src="../../public/../src/assets/images/bagbuddydark.png"
                alt="Logo"
                width="200"
                height="200"
                className="mb-3"
              />
            </Link>
            <Nav className="justify-content-center gap-4">
              <Link to="/shop">
                <Button variant="link" className="text-white p-0">
                  Shop
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="link" className="text-white p-0">
                  About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="link" className="text-white p-0">
                  Contact
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="link" className="text-white p-0">
                  FAQ
                </Button>
              </Link>
              <Link to="/returns">
                <Button variant="link" className="text-white p-0">
                  Returns
                </Button>
              </Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center text-sm-start mb-3 mb-sm-0">
            <div className="mb-2">
              &copy; {currentYear}. All Rights Reserved.
            </div>
            <div className="text-secondary">
              Built by Carmen Romano with{" "}
              <span className="text-danger">&#9829;</span>
            </div>
          </Col>
          <Col className="text-center text-sm-end">
            <Nav className="justify-content-center justify-content-sm-end gap-4">
              <Nav.Link href="#!" className="text-white">
                <BsYoutube size={24} />
              </Nav.Link>
              <Nav.Link href="#!" className="text-white">
                <BsFacebook size={24} />
              </Nav.Link>
              <Nav.Link href="#!" className="text-white">
                <BsTwitter size={24} />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
