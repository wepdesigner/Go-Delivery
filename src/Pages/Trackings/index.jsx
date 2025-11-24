// export function genTracking() {
//   const prefix = "DS";
//   const random = Math.floor(100000 + Math.random() * 900000);
//   return `${prefix}-${Date.now()}-${random}`;
// }


import React, { useState } from "react";
import { exportTrackDelivery } from "../Service/deliveryService";
import "./index.css";

export function Trackings() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Searching...");
    setResult(null);
    const res = await exportTrackDelivery(tracking.trim());
    if (res.success) {
      setResult(res.delivery);
      setMsg("");
    } else {
      setMsg(res.message || "Not found");
    }
  };

  return (
    <div className="tracking-page">
      <h2>Track Your Delivery</h2>
      <form onSubmit={handleSubmit} className="tracking-form">
        <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Enter tracking number" required />
        <button type="submit">Track</button>
      </form>

      {msg && <p className="info">{msg}</p>}

      {result && (
        <div className="tracking-result">
          <p><strong>Tracking:</strong> {result.trackingNumber}</p>
          <p><strong>Client:</strong> {result.fullName} ({result.phone})</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Expedition:</strong> {new Date(result.expeditionDate).toLocaleDateString()}</p>
          <p><strong>Delivery:</strong> {new Date(result.deliveryDate).toLocaleDateString()}</p>
          {result.image && <img src={`http://localhost:5000/${result.image}`} alt="good" style={{maxWidth:200, marginTop:8}} />}
        </div>
      )}
    </div>
  );
}
