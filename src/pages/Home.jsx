import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const services = [
    { name: "Plumber", icon: "💧", path: "/plumbers" },
    { name: "Electrician", icon: "⚡", path: "/electricians" },
    { name: "Beautician", icon: "💄", path: "/beauticians" },
    { name: "Gardener", icon: "🌿", path: "/gardeners" },
    { name: "Tutor", icon: "📚", path: "/tutors" },
    { name: "Cleaner", icon: "🧹", path: "/cleaners" },
    { name: "Security", icon: "🛡️", path: "/security" },
    { name: "Home Nurse", icon: "🩺", path: "/nurse" },
    { name: "Helper", icon: "🏠", path: "/helpers" }
  ];

  return (
    <div className="home">

      {/* HEADER */}
      <div className="header">
        <h1>Urban <span>Buddy</span></h1>
        <p>Your trusted local service partner</p>
      </div>

      {/* SEARCH */}
      <input className="search" placeholder="Search for services..." />

      {/* SERVICES */}
      <h3>Popular Services</h3>

      <div className="services">
        {services.map((s, i) => (
          <div
            key={i}
            className="service-card"
            onClick={() => navigate(s.path)}
          >
            <div className="icon">{s.icon}</div>
            <p>{s.name}</p>
          </div>
        ))}
      </div>

      {/* OFFERS */}
      <h3>Featured Deals</h3>

      <div className="offer blue">
        <h4>20% OFF - Home Cleaning</h4>
        <p>Limited time offer</p>
      </div>

      <div className="offer brown">
        <h4>₹150 OFF First Booking</h4>
        <p>New user special</p>
      </div>

      {/* HOW IT WORKS */}
      <h3>How Urban Buddy Works</h3>

      <div className="steps">
        <div className="step">1. Choose Service</div>
        <div className="step">2. Book Slot</div>
        <div className="step">3. Get Service</div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div onClick={() => navigate("/")}>🏠 Home</div>
        <div onClick={() => navigate("/booking")}>📅 Bookings</div>
        <div onClick={() => navigate("/profile")}>👤 Profile</div>
      </div>

    </div>
  );
}

export default Home;