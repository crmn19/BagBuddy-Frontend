import React from "react";
import logo from "../assets/images/Scarecrow.png";
import "../style/404.css";
import { Button } from "@mui/material";
import { Col, Row } from "react-bootstrap";

const NotFound = () => {
  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="notfound-container mt-5">
      <Row className="align-items-center">
        <Col md={6}>
          {" "}
          <div className="notfound-header ">
            <h4 className="mx-5 my-5">404 Not Found</h4>
          </div>
          <div className="notfound-content">
            <div className="notfound-image">
              <img src={logo} alt="404-Scarecrow" className="img-fluid" />
            </div>
          </div>
        </Col>
        <Col md={6}>
          {" "}
          <div className="notfound-header ">
            <div className="notfound-text">
              <h1 className="fw-bold fs-1">Ho una brutta notizia per te</h1>
              <p className="fs-5 my-4">
                La pagina che stai cercando potrebbe essere stata rimossa o è
                temporaneamente non disponibile.
              </p>
              <Button className="bg-black text-white" onClick={handleHomeClick}>
                Torna alla homepage
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;
