import React, { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Navbar } from "../../Components/Navbar";
import { Home } from "lucide-react";
import { Footer } from "../../Components/Footer";

export function Tracking() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("Searching...");
    setResult(null);

    // Retrieve all deliveries stored locally
    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");

    // Find delivery by tracking number
    const found = storedDeliveries.find(
      (d) => d.trackingNumber.trim() === tracking.trim()
    );

    if (found) {
      setResult(found);
      setMsg("");
    } else {
      setMsg("Tracking number not found.");
    }
  };

  return (
    <>

        <Navbar />

             

        <div className="tracking-page">
          <h2>Track a Delivery</h2>
          <form onSubmit={handleSubmit} className="tracking-form2">
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="Enter tracking number"
              required
            />
            <button type="submit">Track</button>
          </form>

          {msg && <p className="info">{msg}</p>}

          {result && (
            <div className="tracking-result">
              <h3>Delivery Details</h3>
              <p><strong>Tracking Number:</strong> {result.trackingNumber}</p>
              <p><strong>Client Name:</strong> {result.fullName}</p>
              <p><strong>Phone:</strong> {result.phone}</p>
              {result.email && <p><strong>Email:</strong> {result.email}</p>}
              <p><strong>Status:</strong> {result.status}</p>
              {result.pickup && <p><strong>Pickup Location:</strong> {result.pickup}</p>}
              {result.delivery && <p><strong>Delivery Location:</strong> {result.delivery}</p>}
              {result.expeditionDate && <p><strong>Expedition Date:</strong> {result.expeditionDate}</p>}
              {result.deliveryDate && <p><strong>Delivery Date:</strong> {result.deliveryDate}</p>}
              {result.size && <p><strong>Package Size:</strong> {result.size}</p>}
              {result.weight && <p><strong>Weight:</strong> {result.weight} kg</p>}
              {result.urgency && <p><strong>Urgency:</strong> {result.urgency}</p>}
              {result.cost && <p><strong>Cost:</strong> {result.cost.toLocaleString()} FCFA</p>}
              {result.description && <p><strong>Description:</strong> {result.description}</p>}
              {result.image && (
                <img
                  src={result.image}
                  alt="Delivered good"
                  className="tracking-image"
                />
              )}
            </div>
          )}
        </div>
        <Footer/>
    </>
  );
}

