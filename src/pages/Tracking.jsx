import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tracking() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("On the way");
  const [time, setTime] = useState(10);
  const [showNotif, setShowNotif] = useState(false);

  // STATUS + NAVIGATION FLOW
  useEffect(() => {
    setTimeout(() => setStatus("Reached Location"), 5000);
    setTimeout(() => setStatus("Service Completed"), 10000);

    // Show notification
    setTimeout(() => setShowNotif(true), 3000);

    // Navigate to rating page
    setTimeout(() => navigate("/rating"), 12000);
  }, [navigate]);

  // TIMER COUNTDOWN
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tracking-container">

      {/* 🔔 NOTIFICATION */}
      {showNotif && (
        <div className="notification">
          🚀 Your buddy is arriving soon!
        </div>
      )}

      {/* MAP */}
      <div className="map">
        <div className="route"></div>

        <div className="start">📍</div>
        <div className="end">🏠</div>

        <div className="vehicle">🚴</div>
      </div>

      {/* ETA */}
      <div className="eta-box">
        <h2>{time} min</h2>
        <p>Service provider is on the way</p>
      </div>

      {/* PROVIDER */}
      <div className="provider-card">
        <h3>Mohan K.</h3>
        <p>⭐ 4.9 | Plumber Expert</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="actions">
        <button className="call-btn">📞 Call</button>
        <button className="chat-btn" onClick={() => navigate("/chat")}>
          💬 Chat
        </button>
      </div>

      {/* STATUS */}
      <div className="status">
        Status: <span>{status}</span>
      </div>

      {/* PROGRESS */}
      <div className="progress">
        <div className="progress-bar"></div>
      </div>

    </div>
  );
}

export default Tracking;