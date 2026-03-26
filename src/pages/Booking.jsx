import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firabaseconfig"; // ✅ FIXED IMPORT
import { collection, addDoc } from "firebase/firestore";

function Booking() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  // TODAY & TOMORROW
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (d) => d.toISOString().split("T")[0];

  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  // TIME SLOTS
  const timeSlots = [
    "07:00 AM", "08:00 AM", "09:00 AM",
    "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM",
    "07:00 PM", "08:00 PM", "09:00 PM"
  ];

  const handleBooking = async () => {
    if (!date || !time || !address) {
      alert("Please fill all fields");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first ❌");
      return;
    }

    try {
      // 🔥 SAVE TO FIREBASE WITH USER
      await addDoc(collection(db, "bookings"), {
        date,
        time,
        address,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date()
      });

      alert(`Booking Confirmed on ${date} at ${time} ✅`);
      navigate("/payment");

    } catch (error) {
      console.error(error);
      alert("Error saving booking ❌");
    }
  };

  return (
    <div className="booking-page">

      <h2>Book Your Service</h2>

      {/* DATE */}
      <label>Select Date</label>
      <select
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input"
      >
        <option value="">Choose Date</option>
        <option value={todayStr}>Today</option>
        <option value={tomorrowStr}>Tomorrow</option>
      </select>

      {/* TIME */}
      <label>Select Time</label>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="input"
      >
        <option value="">Choose Time</option>
        {timeSlots.map((t, i) => (
          <option key={i} value={t}>{t}</option>
        ))}
      </select>

      {/* ADDRESS */}
      <label>Enter Address</label>
      <textarea
        placeholder="Enter full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* BUTTON */}
      <button onClick={handleBooking}>
        Confirm Booking
      </button>

    </div>
  );
}

export default Booking;