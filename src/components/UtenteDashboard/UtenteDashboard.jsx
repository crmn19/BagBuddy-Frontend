import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Divider,
  Box,
  Button,
} from "@mui/material";
import MyNavbar from "../MyNavbar";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const UtenteDashboard = () => {
  const [cliente, setCliente] = useState(null);
  const [ordini, setOrdini] = useState([]);
  const [carrelli, setCarrelli] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch("http://localhost:3001/customers/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const clienteData = await response.json();
        setCliente(clienteData);

        if (clienteData && clienteData.id) {
          const ordiniResponse = await fetch(
            `http://localhost:3001/customers/ordini`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const ordiniData = await ordiniResponse.json();
          setOrdini(ordiniData);

          const carrelliResponse = await fetch(
            `http://localhost:3001/customers/cart`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const carrelliData = await carrelliResponse.json();
          setCarrelli(carrelliData);
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati del cliente", error);
      }
    };

    fetchCliente();
  }, [token]);

  const handleCheckout = async cartId => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${cartId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const orderData = await response.json();
        navigate("/order");
      } else {
        console.error("Errore nella creazione dell'ordine");
      }
    } catch (error) {
      console.error("Errore nella procedura di checkout", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h5"
            align="start"
            gutterBottom
            className="fw-bold my-3"
          >
            Ciao, {cliente ? cliente.nome : ""} {cliente ? cliente.cognome : ""}
          </Typography>

          <Typography variant="h5" gutterBottom className="fw-bold">
            Carrello
          </Typography>
          <Grid container spacing={3}>
            {carrelli.length > 0 ? (
              carrelli.map(carrello => (
                <Grid item xs={12} key={carrello.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">ID: {carrello.id}</Typography>
                      <Typography variant="body1">
                        Data: {carrello.date}
                      </Typography>
                      <Typography variant="body1">
                        Totale: {carrello.price.toFixed(2)} €
                      </Typography>
                      <Typography variant="body1">Prodotti:</Typography>
                      <List>
                        {carrello.products.map(item => (
                          <ListItem key={item.productId} disableGutters>
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "cover",
                                marginRight: 16,
                              }}
                            />
                            <ListItemText
                              primary={item.name}
                              secondary={
                                <>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {item.description} - {item.brand}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {" | "}Prezzo: {item.price.toFixed(2)} € |
                                    Quantità: {item.quantity} | In Stock:{" "}
                                    {item.inMagazzino}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider sx={{ my: 4 }} />
                      <Box mt={2}>
                        <Button
                          variant="outlined"
                          style={{
                            borderColor: "black",
                            color: "black",
                            backgroundColor: "transparent",
                            borderWidth: "2px",
                          }}
                          onClick={() => handleCheckout(carrello.id)}
                        >
                          Procedi al pagamento
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Container>
                {" "}
                <Typography className="my-4">
                  Non hai carrelli attivi.
                </Typography>
              </Container>
            )}
          </Grid>

          <Divider sx={{ mb: 4 }} />
          <Typography variant="h5" gutterBottom className="fw-bold">
            Cronologia degli ordini
          </Typography>
          <Grid container spacing={3}>
            {ordini.length > 0 ? (
              ordini.map(ordine => (
                <Grid item xs={12} key={ordine.orderId}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">ID: {ordine.orderId}</Typography>
                      <Typography variant="body1">
                        Status: {ordine.status}
                      </Typography>
                      <Typography variant="body1">
                        Totale:{" "}
                        {ordine.products
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}{" "}
                        €
                      </Typography>
                      <Typography variant="body1">Prodotti:</Typography>
                      <List>
                        {ordine.products.map(product => (
                          <ListItem key={product.productId} disableGutters>
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "cover",
                                marginRight: 16,
                              }}
                            />
                            <ListItemText
                              primary={product.name}
                              secondary={
                                <>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {product.description} - {product.brand}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {" | "}Prezzo: {product.price.toFixed(2)} €
                                    | Quantità: {product.quantity} | In Stock:{" "}
                                    {product.inStock}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Container>
                <Typography className="my-4">Non hai ordini.</Typography>
              </Container>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UtenteDashboard;
