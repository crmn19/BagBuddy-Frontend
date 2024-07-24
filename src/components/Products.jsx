import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../style/CardProducs.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:3001/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setProducts(data.content))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <Container id="products" className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">TOP PICKS</h2>
        </Col>
      </Row>
      <Row>
        {products.map(product => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4 text-start"
          >
            <Card className="card-products">
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Text>{product.name}</Card.Text>
                <Card.Title className="fw-bold">{product.price} €</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
