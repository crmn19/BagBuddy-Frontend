/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import "../style/CardProducs.css";

const Products = ({
  search = "",
  sortBy = "price",
  category = "",
  size = 10,
}) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const url = new URL("http://localhost:3001/products");
    url.searchParams.append("page", currentPage - 1);
    url.searchParams.append("size", size);
    url.searchParams.append("sortBy", sortBy);
    if (search) url.searchParams.append("search", search);
    if (category) url.searchParams.append("category", category);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, [currentPage, size, sortBy, search, category]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container>
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
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none"
              >
                <Card className="card-products">
                  <div className=" ratio ratio-1x1">
                    <Card.Img variant="top" src={product.imageUrl} />
                  </div>

                  <Card.Body>
                    <Card.Text>{product.name}</Card.Text>
                    <Card.Title className="fw-bold">
                      {product.price} €
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {size > 4 && totalPages > 1 && (
          <Row className="my-5">
            <Col>
              <Pagination
                page={currentPage}
                className="d-flex justify-content-center"
                count={totalPages}
                onChange={handlePageChange}
                renderItem={item => (
                  <PaginationItem
                    component={Link}
                    to={`/products?page=${item.page}`}
                    {...item}
                  />
                )}
              />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Products;
