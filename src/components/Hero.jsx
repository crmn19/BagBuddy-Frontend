import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Hero.css";
import Products from "./Products";
import { Button } from "@mui/material";

const Hero = () => {
  return (
    <>
      <section className="hero-container">
        <div className="hero-content">
          <p className="text-white">
            Dalle escursioni in montagna ai viaggi più estremi, trova il tuo
            compagno ideale per ogni esplorazione!
          </p>
          <Button
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
        <Products />
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
