import React, { useEffect } from "react";

const SuccessPayment = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentId = query.get("paymentId");
    const payerId = query.get("PayerID");

    if (paymentId && payerId) {
      fetch(
        `http://localhost:3001/pay/success?paymentId=${paymentId}&PayerID=${payerId}`
      );
    }
  }, []);

  return (
    <div>
      <h1>Pagamento completato con successo!</h1>
      <p>Grazie per il tuo acquisto.</p>
    </div>
  );
};

export default SuccessPayment;
