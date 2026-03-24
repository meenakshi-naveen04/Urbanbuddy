import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Urban Buddy</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/history">History</Link>
        <Link to="/chat">Chat</Link>
      </div>
    </nav>
  );
}

export default Navbar;