import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [method, setMethod] = useState("upi");
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Confirm & Pay</h2>

      <div className="summary">
        <p>Service: Plumbing Fix</p>
        <p>Date: Oct 21</p>
        <p>Total: ₹499</p>
      </div>

      <h3>Select Payment Method</h3>

      <div
        className={`pay-option ${method === "upi" && "selected"}`}
        onClick={() => setMethod("upi")}
      >
        UPI / QR Code
      </div>

      <div
        className={`pay-option ${method === "card" && "selected"}`}
        onClick={() => setMethod("card")}
      >
        Credit/Debit Card
      </div>

      <div
        className={`pay-option ${method === "wallet" && "selected"}`}
        onClick={() => setMethod("wallet")}
      >
        Wallet
      </div>

      <button
        className="primary-btn blue"
        onClick={() => navigate("/success")}
      >
        Pay ₹499 Securely
      </button>
    </div>
  );
}

export default Payment;