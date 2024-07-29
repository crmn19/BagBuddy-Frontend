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
import { useNavigate } from "react-router-dom";
import MyNavbar from "../MyNavbar";
import { BsPaypal } from "react-icons/bs";

const RiepilogoOrdine = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idOrder, setIdOrder] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState({
    method: "paypal",
    amount: null,
    currency: "EUR",
    description: null,
    intent: "sale",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("authToken");
      const url = "http://localhost:3001/orders/customer";

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
          if (data.length > 0) {
            const latestOrder = data[data.length - 1];
            console.log(latestOrder);
            setOrderDetails(latestOrder);
            setIdOrder(latestOrder.orderId);
            console.log(idOrder);
            const totalAmount = calculateTotalPrice(latestOrder.products) + 8;
            setOrder({
              ...order,
              amount: totalAmount.toFixed(2),
              description: `Ordine #${latestOrder.id}`,
            });
          } else {
            setError("Nessun ordine trovato.");
          }
        } else {
          throw new Error("Errore nel recupero dei dettagli dell'ordine.");
        }
      } catch (error) {
        setError(error.message || "Errore nella richiesta.");
      } finally {
        setLoading(false);
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
      } finally {
        setLoading(false);
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
          console.log(data);
          setAddressDetails(data);
        } else {
          throw new Error("Errore nel recupero dei dettagli dell'indirizzo.");
        }
      } catch (error) {
        setError(error.message || "Errore nella richiesta.");
      }
    };

    fetchOrderDetails();
    fetchAddressDetails();
    fetchCustomer();
  }, []);

  const calculateTotalPrice = products => {
    if (!products || products.length === 0) return 0;
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("authToken");

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

  const handleUpdateOrder = async () => {
    const token = localStorage.getItem("authToken");
    const updatedOrderDetails = {
      method: order.method,
      amount: order.amount,
      currency: order.currency,
      description: order.description,
      intent: order.intent,
    };

    try {
      const response = await fetch(`http://localhost:3001/orders/${idOrder}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedOrderDetails),
      });

      if (response.ok) {
        alert("Ordine aggiornato con successo!");
      } else {
        throw new Error("Errore nell'aggiornamento dell'ordine.");
      }
    } catch (error) {
      setError(error.message || "Errore nella procedura di aggiornamento.");
      console.error("Errore nella procedura di aggiornamento", error);
    }
  };

  const completePaymentAndUpdateOrder = async () => {
    try {
      await handlePayment();
      await handleUpdateOrder();
    } catch (error) {
      console.error(
        "Errore durante il pagamento o l'aggiornamento dell'ordine",
        error
      );
    }
  };

  return (
    <>
      <MyNavbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dettagli spedizione
        </Typography>
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
                        Subtotale: €{" "}
                        {calculateTotalPrice(orderDetails.products)}
                      </Typography>
                      <Typography variant="body1">
                        Consegna Standard: € 8,00
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Totale Ordine: €{" "}
                        {calculateTotalPrice(orderDetails.products) + 8}
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
          onClick={completePaymentAndUpdateOrder}
        >
          <BsPaypal style={{ marginRight: "8px" }} />
          Paga con Paypal
        </Button>
      </Container>
    </>
  );
};

export default RiepilogoOrdine;
