import React, { useState, useEffect } from "react";
import MyNavbar from "./MyNavbar";
import { Typography, Select, MenuItem, Button } from "@mui/material";
import Products from "./Products";
import { ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const AllProducts = () => {
  const [sortBy, setSortBy] = useState("price"); // Default sorting by price
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (sortBy) params.append("sortBy", sortBy);
    if (category) params.append("category", category);

    navigate(`/products?${params.toString()}`);
  }, [sortBy, category, searchQuery, navigate]);

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <div className="image-container position-relative img-product">
          <img
            src="../../src/assets/images/Inizia a esplorare..png"
            alt="Descrizione immagine 2"
            className="w-100 h-50 allproduct-img"
          />
          <div className="btn-overlay2">
            <ButtonGroup variant="text" aria-label="Basic button group">
              <Button
                className="btn-product"
                value="VIAGGIO"
                onClick={handleCategoryChange}
                style={{
                  borderColor: "#8C51FF",
                  color: "#8c51ff",
                  backgroundColor: "trasparent",
                  fontSize: "0.9em",
                  border: " 2px solid",
                  marginRight: "4px",
                }}
              >
                Zaini Viaggio
              </Button>
              <Button
                className="btn-product"
                value="TREKKING"
                onClick={handleCategoryChange}
                style={{
                  borderColor: "#8C51FF",
                  color: "#8c51ff",
                  backgroundColor: "trasparent",
                  fontSize: "0.9em",
                  border: " 2px solid",
                  marginRight: "4px",
                }}
              >
                Zaini Trekking
              </Button>
              <Button
                className="btn-product"
                value="CAMPEGGIO"
                onClick={handleCategoryChange}
                style={{
                  borderColor: "#8C51FF",
                  color: "#8c51ff",
                  backgroundColor: "trasparent",
                  fontSize: "0.9em",
                  border: " 2px solid",
                }}
              >
                Zaini Campeggio
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <Container id="products" className="mt-5">
          <Row className="mb-5">
            <Col md={3}>
              <Typography variant="h5">Di Tendenza</Typography>
            </Col>
          </Row>
          <Row className="mb-5 justify-content-between">
            <Col md={3}>
              <Select
                value={category}
                onChange={handleCategoryChange}
                displayEmpty
                fullWidth
                variant="outlined"
              >
                <MenuItem value="">Tutte le categorie</MenuItem>
                <MenuItem value="TREKKING">Trekking</MenuItem>
                <MenuItem value="VIAGGIO">Viaggio</MenuItem>
                <MenuItem value="GIORNO">Giorno</MenuItem>
                <MenuItem value="CAMPEGGIO">Campeggio</MenuItem>
                <MenuItem value="SPORT">Sport</MenuItem>
                <MenuItem value="LAPTOP">Laptop</MenuItem>
                <MenuItem value="BAMBINO">Bambino</MenuItem>
                <MenuItem value="IMPERMEABILI">Impermeabili</MenuItem>
                <MenuItem value="ECO_SOSTENIBILI">Eco-sostenibili</MenuItem>
              </Select>
            </Col>
            <Col md={3}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                fullWidth
                variant="outlined"
              >
                <MenuItem value="price">Ordina: Prezzo crescente</MenuItem>
                <MenuItem value="createdAt">Ordina: Ultimi arrivi</MenuItem>
              </Select>
            </Col>
          </Row>

          <Products
            size={10}
            sortBy={sortBy}
            category={category}
            search={searchQuery}
          />
        </Container>
      </Container>
      <Footer />
    </>
  );
};

export default AllProducts;
