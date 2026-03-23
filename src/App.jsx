import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import History from "./pages/History";
import Chat from "./pages/Chat";

import Plumbers from "./pages/Plumbers";
import PlumberProfile from "./pages/Plumberprofile";
import Beauticians from "./pages/Beauticians";
import BeauticianProfile from "./pages/Beauticianprofile";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/history" element={<History />} />
        <Route path="/chat" element={<Chat />} />

        {/* NEW ROUTES */}
        <Route path="/plumbers" element={<Plumbers />} />
        <Route path="/plumber/:id" element={<PlumberProfile />} />

        <Route path="/beauticians" element={<Beauticians/>} />
        <Route path="/beautician/:id" element={<BeauticianProfile />} />

      </Routes>
    </Router>
  );
}

export default App;