import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter valid 10-digit phone";
    if (!form.address) newErrors.address = "Address required";
    if (!form.date) newErrors.date = "Select date";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate("/payment");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Book Service</h2>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <span>{errors.name}</span>

      <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <span>{errors.phone}</span>

      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <span>{errors.address}</span>

      <input
        type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <span>{errors.date}</span>

      <button type="submit">Proceed to Payment</button>
    </form>
  );
}

export default BookingForm;
