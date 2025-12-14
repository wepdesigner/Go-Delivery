import React, { useState } from "react";
import "./index.css"
import { Navbar2 } from "../../Components/Navbar2";
// import { NewDelivery } from "../services/deliveryService";


export function NewDelivery() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    status: "Pending",
    expeditionDate: "",
    deliveryDate: "",
    image: null,
  });

  const [trackingNumber, setTrackingNumber] = useState("");
  const [message, setMessage] = useState("");

  // Generate tracking number
  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${prefix}-${Date.now()}-${randomNum}`;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tracking = generateTrackingNumber();
    setTrackingNumber(tracking);

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    dataToSend.append("trackingNumber", tracking);

    const response = await NewDelivery(dataToSend);
    if (response.success) {
      setMessage("Delivery successfully added!");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        status: "Pending",
        expeditionDate: "",
        deliveryDate: "",
        image: null,
      });
    } else {
      setMessage("Error adding delivery.");
    }
  };

  return (
      <>
      <Navbar2/>
          <div className="add-delivery-container">
      <h2>Add New Delivery</h2>
      <form onSubmit={handleSubmit} className="delivery-form">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Deliver">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Cancel">Cancel</option>
        </select>

        <label>Picture of the Good</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <label>Expedition Date</label>
        <input
          type="date"
          name="expeditionDate"
          value={formData.expeditionDate}
          onChange={handleChange}
          required
        />

        <label>Delivery Date</label>
        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Add Delivery</button>
      </form>

      {trackingNumber && (
        <div className="tracking-display">
          <p><strong>Tracking Number:</strong> {trackingNumber}</p>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
      </>
  );
}