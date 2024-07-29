import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"; // Importa Button da react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Assicurati di avere Bootstrap incluso nel tuo progetto

const SuccessPayment = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            Authorization: `Bearer ${token}`, // Corretta interpolazione
          },
        }
      )
        .then(response => {
          if (response.ok) {
            setLoading(false);
          } else {
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

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1 className="mb-4 text-success">
          Pagamento completato con successo!
        </h1>
        <p>
          Grazie per il tuo acquisto. Riceverai presto una conferma via email.
        </p>
        <Button variant="primary" onClick={handleHomeClick} className="mt-4">
          Torna alla Home
        </Button>
      </div>
    </div>
  );
};

export default SuccessPayment;
