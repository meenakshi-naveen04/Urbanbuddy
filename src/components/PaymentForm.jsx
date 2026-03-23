import React, { useState } from "react";

function PaymentForm() {
  const [card, setCard] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      card.cardNumber.length === 16 &&
      card.cvv.length === 3
    ) {
      setMessage("Payment Successful!");
    } else {
      setMessage("Invalid Card Details");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Secure Payment</h2>

      <input
        type="text"
        placeholder="Card Number"
        maxLength="16"
        onChange={(e) =>
          setCard({ ...card, cardNumber: e.target.value })
        }
      />

      <input
        type="month"
        onChange={(e) =>
          setCard({ ...card, expiry: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="CVV"
        maxLength="3"
        onChange={(e) =>
          setCard({ ...card, cvv: e.target.value })
        }
      />

      <button type="submit">Pay Now</button>

      <p>{message}</p>
    </form>
  );
}

export default PaymentForm;
