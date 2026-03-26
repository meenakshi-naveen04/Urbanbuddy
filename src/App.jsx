import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Main Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import History from "./pages/History";
import Chat from "./pages/Chat";
import Success from "./pages/Success";
import Loading from "./pages/loading";   // ✅ FIXED

// Service Pages
import Plumbers from "./pages/Plumbers";
import PlumberProfile from "./pages/Plumberprofile";  // ✅ FIXED

import Beauticians from "./pages/Beauticians";
import BeauticianProfile from "./pages/Beauticianprofile";  // ✅ FIXED

// Auth & Profile Pages
import Login from "./pages/login";     // ✅ FIXED
import Register from "./pages/register"; // ✅ FIXED
import Profile from "./pages/profile";   // ✅ FIXED

// ⭐ NEW PAGE
import Rating from "./pages/Rating";

function App() {
  return (
    <Router>
      

      <Routes>
        {/* LOADING FIRST */}
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
         <Route path="/search" element={<Search />} />

        {/* MAIN ROUTES */}
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/history" element={<History />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/success" element={<Success />} />
        <Route path="/rating" element={<Rating />} /> {/* ⭐ ADDED */}

        {/* SERVICE ROUTES */}
        <Route path="/plumbers" element={<Plumbers />} />
        <Route path="/plumber/:id" element={<PlumberProfile />} />

        <Route path="/beauticians" element={<Beauticians />} />
        <Route path="/beautician/:id" element={<BeauticianProfile />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;