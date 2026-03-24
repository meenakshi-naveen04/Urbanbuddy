import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Schedule() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("11:00 - 1:00 PM");

  const times = [
    "9:00 - 11:00 AM",
    "11:00 - 1:00 PM",
    "1:00 - 3:00 PM",
    "3:00 - 5:00 PM"
  ];

  return (
    <div className="container">
      <h2>Schedule Service</h2>

      <div className="booking-card">
        Booking with: <b>Mohan K.</b>
      </div>

      <div className="service-card">
        <h3>Standard Plumbing Fix</h3>
        <p>Fix leaks, drains, installation</p>
        <span>⭐ 4.8</span>
      </div>

      <h3>Schedule Time</h3>

      <div className="time-grid">
        {times.map((t) => (
          <button
            key={t}
            className={selectedTime === t ? "active" : ""}
            onClick={() => setSelectedTime(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="price-box">
        <h3>₹499</h3>
        <p>Service Cost</p>
      </div>

      <button
        className="primary-btn"
        onClick={() => navigate("/payment")}
      >
        Continue to Payment (₹499)
      </button>
    </div>
  );
}

export default Schedule;