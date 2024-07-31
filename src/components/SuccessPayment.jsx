import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Confetti from "react-confetti";
import { useSelector } from "react-redux";

const SuccessPayment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const storedOrder = JSON.parse(localStorage.getItem("orderDetails"));
  const paymentAmount = JSON.parse(localStorage.getItem("paymentAmount"));

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentId = query.get("paymentId");
    const payerId = query.get("PayerID");
    const token = localStorage.getItem("authToken");

    if (paymentId && payerId) {
      fetch(
        `http://localhost:3001/pay/success?paymentId=${paymentId}&PayerID=${payerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(response => {
          if (response.ok) {
            setLoading(false);
            setShowConfetti(true);
            updateOrder(token);
          } else {
            setError("Impossibile completare il pagamento.");
            throw new Error("Impossibile completare il pagamento.");
          }
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError("Informazioni di pagamento mancanti.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const updateOrder = async token => {
    if (!storedOrder || !storedOrder.orderId) {
      setError("Dettagli dell'ordine mancanti.");
      return;
    }

    setOrderLoading(true);

    const updatedOrderDetails = {
      method: "paypal",
      amount: paymentAmount,
      currency: "EUR",
      description: `Ordine #${storedOrder.orderId}`,
      intent: "sale",
    };

    try {
      const response = await fetch(
        `http://localhost:3001/orders/${storedOrder.orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedOrderDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Errore nell'aggiornamento dell'ordine."
        );
      }
      setOrderDetails({
        ...storedOrder,
        amount: paymentAmount,
      });
    } catch (error) {
      setError(error.message || "Errore nella procedura di aggiornamento.");
    } finally {
      setOrderLoading(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString();
  };

  const formatDate = dateString => {
    if (!dateString) return getTodayDate();
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? getTodayDate() : date.toLocaleDateString();
  };

  const handleNavigateHome = () => {
    navigate("/products");
  };

  return (
    <>
      <MyNavbar />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          {showConfetti && !loading && !error && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : (
            <>
              <Typography variant="h4" gutterBottom className="text-center ">
                <span className="fw-bold"> Grazie per il tuo acquisto!</span>
                <br />
                <span className="fs-5">
                  {" "}
                  Riceverai presto una conferma via email.
                </span>
                <br />
              </Typography>
              {orderDetails && (
                <Card sx={{ mt: 2, width: "100%" }}>
                  <CardContent>
                    <Divider>
                      <strong>DETTAGLI ORDINE</strong>{" "}
                    </Divider>
                    <Typography variant="h6" className="my-3">
                      <strong> Ordine </strong>#{orderDetails.orderId}
                    </Typography>

                    <Typography variant="body1" className="my-3">
                      <strong>Data Ordine:</strong>{" "}
                      {formatDate(orderDetails.createdAt)}
                    </Typography>
                    <Typography variant="body1" className="my-3">
                      <strong>Prodotto Acquistato:</strong>
                      {orderDetails.products[0]?.name}
                    </Typography>
                    <Typography variant="body1" className="my-3">
                      <strong>Brand:</strong> {orderDetails.products[0]?.brand}
                    </Typography>
                    <Divider>
                      <strong>TOTALE PAGATO</strong>{" "}
                    </Divider>
                    <Typography variant="h5" className="text-center mt-3">
                      €{orderDetails.amount}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              <Button
                variant="contained"
                className="bg-black text white w-100"
                onClick={handleNavigateHome}
                sx={{ mt: 4 }}
              >
                continua lo shopping
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default SuccessPayment;
