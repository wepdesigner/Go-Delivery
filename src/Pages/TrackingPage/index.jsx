

import React, { useState, useEffect } from "react";
import "./trackingpage.css";
import { Link } from "react-router-dom";
import { Navbar2 } from "../../Components/Navbar2";

export function TrackingPage() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");
  const [allDeliveries, setAllDeliveries] = useState([]);

  // Load all deliveries from localStorage on mount
  useEffect(() => {
    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    setAllDeliveries(storedDeliveries);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("Searching...");
    setResult(null);

    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");

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

    <Navbar2/>
      <div className="dashboard-page">
        <aside className="dashboard-sidebar">
          <h3>Admin Panel</h3>
          <ul>
            <li><Link to="/dashboard" className="nav-button">Dashboard</Link></li>
            <li><Link to="/adddelivery" className="nav-button">Add Delivery</Link></li>
            <li><Link to="/clients" className="nav-button">Clients</Link></li>
            <li><Link to="/trackingpage" className="nav-button">Track</Link></li>
            <li><Link to="/agentregister" className="nav-button">AddAgent</Link></li>
            <li><Link to="/agentfeedback" className="nav-button">Agents Feedback</Link></li>
          </ul>
        </aside>

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

          {/* === All Deliveries Section === */}
          <div className="all-deliveries2">
            <h2>All Deliveries</h2>
            {allDeliveries.length === 0 ? (
              <p>No deliveries found.</p>
            ) : (
              <table className="deliveries-table">
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Expedition</th>
                    <th>Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {allDeliveries.map((delivery, index) => (
                    <tr key={index}>
                      <td>{delivery.trackingNumber}</td>
                      <td>{delivery.fullName}</td>
                      <td>{delivery.status}</td>
                      <td>{delivery.expeditionDate}</td>
                      <td>{delivery.deliveryDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
