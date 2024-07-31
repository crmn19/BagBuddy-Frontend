import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { BsPaypal } from "react-icons/bs";
import MyNavbar from "../MyNavbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RiepilogoOrdine = () => {
  const { orderId } = useParams(); // Ottieni l'ID dall'URL
  const [addressDetails, setAddressDetails] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const metodoSpedizione = useSelector(
    state => state.shipping.metodoSpedizione
  );

  const shippingCosts = {
    standard: 8.0,
    express: 12.0,
  };

  const calculateTotalPrice = products => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("authToken");
      let url = "http://localhost:3001/orders/customer";

      if (orderId) {
        url = `http://localhost:3001/orders/find/${orderId}`;
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            const orderData = Array.isArray(data)
              ? data[data.length - 1]
              : data;
            localStorage.setItem("orderDetails", JSON.stringify(orderData));
            const subtotal = calculateTotalPrice(orderData.products);
            const amount =
              subtotal > 85
                ? subtotal // Spedizione gratuita
                : subtotal + (shippingCosts[metodoSpedizione] || 0);

            localStorage.setItem("paymentAmount", amount.toFixed(2));
            setOrderDetails(orderData);
          } else {
            setError("Nessun ordine trovato.");
          }
        } else {
          throw new Error("Errore nel recupero dei dettagli dell'ordine.");
        }
      } catch (error) {
        setError(error.message || "Errore nella richiesta.");
      }
    };

    const fetchCustomer = async () => {
      const token = localStorage.getItem("authToken");
      const url = "http://localhost:3001/customers/me";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomer(data);
        } else {
          throw new Error("Errore nel recupero dati cliente.");
        }
      } catch (error) {
        setError(error.message || "Errore nella richiesta.");
      }
    };

    const fetchAddressDetails = async () => {
      const token = localStorage.getItem("authToken");
      const url = "http://localhost:3001/indirizzi/find";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAddressDetails(data);
        } else {
          throw new Error("Errore nel recupero dei dettagli dell'indirizzo.");
        }
      } catch (error) {
        setError(error.message || "Errore nella richiesta.");
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchOrderDetails(),
        fetchCustomer(),
        fetchAddressDetails(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [orderId, metodoSpedizione]);

  const subtotal = orderDetails
    ? calculateTotalPrice(orderDetails.products)
    : 0;

  const shippingCost = subtotal > 85 ? 0 : shippingCosts[metodoSpedizione] || 0;
  const totalPrice = subtotal + shippingCost;

  const handlePayment = async () => {
    const token = localStorage.getItem("authToken");
    const order = {
      method: "paypal",
      amount: totalPrice.toFixed(2),
      currency: "EUR",
      description: `Ordine #${orderDetails?.id}`,
      intent: "sale",
    };

    try {
      const response = await fetch("http://localhost:3001/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const { approval_url } = await response.json();
        window.location.href = approval_url;
      } else {
        throw new Error("Errore nella procedura di pagamento.");
      }
    } catch (error) {
      setError(error.message || "Errore nella procedura di pagamento.");
      console.error("Errore nella procedura di pagamento", error);
    }
  };

  return (
    <>
      <MyNavbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {orderDetails && addressDetails && customer && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Spedizione
                </Typography>
                <Typography>
                  {addressDetails.via}, {addressDetails.civico}
                </Typography>
                <Typography>
                  {addressDetails.comune.name}, {addressDetails.provincia.name}
                  <br />
                  {addressDetails.cap}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Dettagli Cliente
                </Typography>
                <Typography>
                  {customer.nome} {customer.cognome}
                  <br />
                  {customer.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Riepilogo Ordine
                </Typography>
                {orderDetails.products && orderDetails.products.length > 0 ? (
                  <>
                    {orderDetails.products.map(product => (
                      <Box
                        key={product.productId}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          borderBottom: "1px solid #ddd",
                          paddingBottom: "8px",
                        }}
                      >
                        <Box>
                          <Typography variant="body1">
                            <strong>
                              {product.quantity} x {product.name}
                            </strong>
                          </Typography>
                          <Typography variant="body2">
                            € {product.price}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography variant="body1">
                        Subtotale: € {subtotal.toFixed(2)}
                      </Typography>
                      <Typography variant="body1">
                        Consegna{" "}
                        {metodoSpedizione === "express"
                          ? "Express"
                          : "Standard"}
                        : € {shippingCost.toFixed(2)}
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Totale Ordine: € {totalPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body1">
                    Nessun prodotto nel carrello.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
        <Button
          className="bg-black text-white w-100 mt-5"
          onClick={handlePayment}
        >
          <BsPaypal style={{ marginRight: "8px" }} />
          Paga con Paypal
        </Button>
      </Container>
    </>
  );
};

export default RiepilogoOrdine;
