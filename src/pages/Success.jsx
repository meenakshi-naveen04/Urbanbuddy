import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">

      {/* SUCCESS ICON */}
      <div className="success-icon">✅</div>

      {/* MESSAGE */}
      <h2>Payment Successful!</h2>
      <p>Your service has been booked successfully</p>

      {/* ANIMATED IMAGE */}
      <div className="animation">
        🚀 Your buddy is on the way!
      </div>

      {/* BUTTON */}
      <button
        className="track-btn"
        onClick={() => navigate("/tracking")}
      >
        Track Your Buddy
      </button>

    </div>
  );
}

export default PaymentSuccess;