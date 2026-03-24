import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

  return (
    <div className="form">
      <h2>Book Service</h2>

      <input placeholder="Name" />
      <input placeholder="Phone" />
      <input placeholder="Address" />
      <input type="date" />

      <button onClick={() => navigate("/payment")}>
        Confirm Booking
      </button>
    </div>
  );
}

export default Booking;