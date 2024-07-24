import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MyNavbar from "../MyNavbar";

const defaultTheme = createTheme();

const UtenteDashboard = () => {
  const [cliente, setCliente] = useState(null);
  const [ordini, setOrdini] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");

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
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati del cliente", error);
      }
    };

    fetchCliente();
  }, [token]);

  return (
    <>
      <MyNavbar />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Benvenuto/a {cliente ? cliente.nome : ""}
          </Typography>
          <Typography variant="h5" gutterBottom>
            I tuoi ordini
          </Typography>
          {ordini.length > 0 ? (
            <List>
              {ordini.map(ordine => (
                <div key={ordine.orderId}>
                  <Typography variant="h6">
                    Ordine ID: {ordine.orderId}
                  </Typography>
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
                      <ListItem key={product.productId}>
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
                                {" | "}Prezzo: {product.price.toFixed(2)} € |
                                Quantità: {product.quantity} | In Stock:{" "}
                                {product.inStock}
                              </Typography>
                            </>
                          }
                        />
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              ))}
            </List>
          ) : (
            <Typography>Non hai ordini.</Typography>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UtenteDashboard;
