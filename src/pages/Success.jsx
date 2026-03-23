import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="overlay">
      <div className="modal">
        <h2>✅ Payment Successful!</h2>
        <p>Your provider is on the way</p>

        <button
          className="primary-btn blue"
          onClick={() => navigate("/tracking")}
        >
          Track Live Location
        </button>
      </div>
    </div>
  );
}

export default Success;