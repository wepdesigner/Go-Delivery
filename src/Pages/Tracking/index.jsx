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

             <section className="hero">
       <div className="hero-overlay">
             <h1 className="hero-title">Track Good</h1>
       </div>
        <div className="hero-images">
          <div className="scrolling-images">
          <img src="public\images\road-freight.jpg" alt="Background 1" />
          <img src="public\images\airfreight-2.jpg" alt="Background 2" />
          <img src="public\images\ware-1024x535-1.webp" alt="Background 3" />
          {/* Repeating for infinite scroll effect */}
          <img src="public\images\road-freight.jpg" alt="Background 1 duplicate" />
          <img src="public\images\airfreight-2.jpg" alt="Background 2 duplicate" />
          <img src="public\images\ware-1024x535-1.webp" alt="Background 3 duplicate" />
        </div>
     </div>
     </section>

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
              <p><strong>Email:</strong> {result.email}</p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Expedition Date:</strong> {result.expeditionDate}</p>
              <p><strong>Delivery Date:</strong> {result.deliveryDate}</p>
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

