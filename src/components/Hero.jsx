import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Hero.css";
import Products from "./Products";
import { Button } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const Hero = () => {
  let navigate = useNavigate();
  return (
    <>
      <section className="hero-container">
        <div className="hero-content">
          <p className="text-white">
            Dalle escursioni in montagna ai viaggi più estremi, trova il tuo
            compagno ideale per ogni esplorazione!
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="btn-hero"
            variant="outlined"
            style={{
              borderColor: "white",
              color: "white",
              backgroundColor: "transparent",
              borderWidth: "2px",
            }}
          >
            Scopri la Collezione
          </Button>
        </div>
      </section>

      <div className="products-section">
        <Container id="products" className="mt-5">
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold">TOP PICKS</h2>
            </Col>
          </Row>
          <Products size={4} />
        </Container>
      </div>
      <section className="image-section d-flex justify-content-between align-items-center">
        <div className="image-container position-relative">
          <img
            src="../../src/assets/images/hero.png"
            alt="Descrizione immagine 1"
          />
          <div className="btn-overlay">
            <p>THREK</p>
            <Button
              onClick={() =>
                navigate("/product/45bfc42b-299d-4685-b8d9-aa5a04269d5e")
              }
              className="btn-hero"
              variant="outlined"
              style={{
                borderColor: "white",
                color: "white",
                backgroundColor: "transparent",
                borderWidth: "2px",
              }}
            >
              ACQUISTA ORA
            </Button>
          </div>
        </div>
        <div className="image-container position-relative">
          <img
            src="../../src/assets/images/hero1.png"
            alt="Descrizione immagine 2"
          />

          <div className="btn-overlay">
            <p> PEAKGEAR2.0</p>
            <Button
              onClick={() =>
                navigate("/product/3a74ebfe-8d03-45da-aee4-91244e2b9a6d")
              }
              className="btn-hero"
              variant="outlined"
              style={{
                borderColor: "white",
                color: "white",
                backgroundColor: "transparent",
                borderWidth: "2px",
              }}
            >
              ACQUISTA ORA
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
