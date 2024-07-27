import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Drawer,
  IconButton,
} from "@mui/material";
import MyNavbar from "./MyNavbar";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { LuLeafyGreen } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import CloseIcon from "@mui/icons-material/Close";

const ADD_TO_CART_URL = "http://localhost:3001/customers/add/";
const REMOVE_FROM_CART_URL = "http://localhost:3001/customers/remove/";

const ProductDetailsCustomer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:3001/products/${id}`, {
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
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");

    fetch(`${ADD_TO_CART_URL}${id}`, {
      method: "POST",
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
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const cartData = data[0];
          if (cartData.products && Array.isArray(cartData.products)) {
            setCartProducts(cartData.products);
            setCartTotal(cartData.price);
          } else {
            console.error("Unexpected data format: ", cartData);
          }
        } else {
          console.error("Unexpected data format: ", data);
        }
        setDrawerOpen(true);
      })
      .catch(error => {
        console.error("Error adding product to cart:", error);
        alert("Errore durante l'aggiunta al carrello.");
      });
  };

  const handleRemoveFromCart = productId => {
    const token = localStorage.getItem("authToken");

    fetch(`${REMOVE_FROM_CART_URL}${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const cartData = data[0];
          if (cartData.products && Array.isArray(cartData.products)) {
            setCartProducts(cartData.products);
            setCartTotal(cartData.price);
          } else {
            console.error("Unexpected data format: ", cartData);
          }
        } else {
          console.error("Unexpected data format: ", data);
        }
      })
      .catch(error => {
        console.error("Error removing product from cart:", error);
        alert("Errore durante la rimozione dal carrello.");
      });
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <MyNavbar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                image={product.imageUrl}
                title={product.name}
                sx={{ height: 500, objectFit: "cover" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 4 }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "primary.main", fontSize: "2rem", mb: 2 }}
                >
                  {product.price} €
                </Typography>

                <Button
                  className="btn-hero"
                  variant="outlined"
                  onClick={handleAddToCart}
                  style={{
                    borderColor: "white",
                    color: "white",
                    backgroundColor: "black",
                    borderWidth: "2px",
                    marginRight: "8px",
                  }}
                >
                  Aggiungi al carrello
                </Button>
              </CardContent>
            </Card>

            <Box sx={{ mt: 4 }}>
              <Typography variant="body2">
                <CiDeliveryTruck /> Consegna gratuita sugli ordini superiori a
                85€ e resi gratuiti.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <LuLeafyGreen /> Il raggiungimento della soglia di spesa
                diminuisce l'impatto ambientale della tua spedizione.
              </Typography>
            </Box>
            <Accordion sx={{ mt: 4 }}>
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Descrizione e Caratteristiche
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                  {product.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Brand: {product.brand}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  In Stock: {product.inMagazzino}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Category: {product.category}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>

      {/* Drawer per mostrare il carrello */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: 400 }}
      >
        <Box
          sx={{ width: 300, p: 4, position: "relative" }}
          role="presentation"
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDrawerClose}
            aria-label="close"
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
            className="text-center fw-bold"
          >
            Carrello
          </Typography>
          {Array.isArray(cartProducts) && cartProducts.length > 0 ? (
            <>
              {cartProducts.map(cartProduct => (
                <Card key={cartProduct.productId} sx={{ mb: 2 }}>
                  <CardMedia
                    component="img"
                    alt={cartProduct.name}
                    image={cartProduct.imageUrl}
                    title={cartProduct.name}
                    sx={{ height: 150, objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6">{cartProduct.name}</Typography>
                    <Typography variant="body1">
                      {cartProduct.price} €
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantità: {cartProduct.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleRemoveFromCart(cartProduct.productId)
                      }
                      style={{
                        borderColor: "black",
                        color: "black",
                        backgroundColor: "white",
                        borderWidth: "1px",
                        marginTop: "8px",
                      }}
                    >
                      Rimuovi
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
                className="fw-bbold text-center"
              >
                Totale: {cartTotal} €
              </Typography>
            </>
          ) : (
            <Typography variant="body2">
              Nessun prodotto nel carrello
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ProductDetailsCustomer;
