import React, { useState } from "react";

const Paypal = () => {
  const [order, setOrder] = useState({
    method: "paypal",
    amount: 10.0,
    currency: "USD",
    description: "ciao",
    intent: "sale",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleChange = e => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

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
        throw new Error("Errore nella procedura di pagamento");
      }
    } catch (error) {
      setError(error.message || "Errore nella procedura di pagamento.");
      console.error("Errore nella procedura di pagamento", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Paypal Payment Integration</h1>
      <form className="mt-5 card p-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="method" className="form-label">
            Payment method
          </label>
          <input
            id="method"
            type="text"
            className="form-control"
            name="method"
            value={order.method}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="form-control"
            name="amount"
            value={order.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currency" className="form-label">
            Currency
          </label>
          <select
            className="form-control"
            id="currency"
            name="currency"
            value={order.currency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="form-control"
            name="description"
            value={order.description}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Pay with Paypal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Paypal;
