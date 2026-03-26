import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const services = [
    { name: "Plumber", icon: "💧", path: "/plumbers" },
    { name: "Electrician", icon: "⚡", path: "/electricians" },
    { name: "Beautician", icon: "💄", path: "/beauticians" },
    { name: "Cleaner", icon: "🧹", path: "/cleaners" },
    { name: "Tutor", icon: "📚", path: "/tutors" },
    { name: "Security", icon: "🛡️", path: "/security" }
  ];

  const scrollToSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-container">

      {/* HEADER */}
      <div className="top-bar">
        <div className="brand">
          <h1>Urban Buddy</h1>
          <p>Your trusted local service partner</p>
        </div>

        <div className="location">📍 TVM</div>
      </div>

      {/* LOGIN / REGISTER */}
      <div className="auth-box">
        <p>New user?</p>
        <button onClick={() => navigate("/register")}>Register</button>
        <span> | </span>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>

      {/* SEARCH */}
      <input
  ref={searchRef}
  className="search-bar"
  placeholder="Search services..."
  onFocus={() => navigate("/search")}   // ✅ go to search page
  onClick={() => navigate("/search")}   // ✅ also works on click
/>
      /

      {/* ADS */}
      <div className="ads-slider">
        <div className="ads-track">
          <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" className="ad-img" />
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" className="ad-img" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG2Ft_gS_HkV0xORA8IwX6FXredHrxxHzIg-OHhQjvZw&s" className="ad-img" />
        </div>
      </div>

      {/* SERVICES */}
      <h3>Services</h3>

      <div className="services-grid">
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

      {/* EXPLORE */}
      <div className="explore-more" onClick={scrollToSearch}>
        Explore More 🔍
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p onClick={() => alert("Urban Buddy - Your trusted service app!")}>
          About Us
        </p>
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div onClick={() => navigate("/home")}>🏠 Home</div>
        <div onClick={() => navigate("/booking")}>📅 Booking</div>
        <div onClick={() => navigate("/history")}>📜 History</div>
        <div onClick={() => navigate("/chat")}>💬 Chat</div>
      </div>

    </div>
  );
}

export default Home;