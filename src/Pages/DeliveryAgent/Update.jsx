import React, { useState } from "react";
import AgentNavbar from "./AgentNavbar";
import AgentSidebar from "./AgentSidebar";
import "./update.css";

export default function Update() {
  //const agent = JSON.parse(localStorage.getItem("loggedAgent"));
  const [tracking, setTracking] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");

  const updateStatus = () => {
    const deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    const index = deliveries.findIndex((d) => d.trackingNumber === tracking);

    if (index === -1) {
      setMessage("❌ Delivery not found.");
      return;
    }

    deliveries[index].status = status;
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
    setMessage("✅ Delivery status updated successfully!");
  };

  return (
    <div className="agent-layout">
      <AgentSidebar />
      <div className="agent-main">
        <AgentNavbar />
        <div className="agent-page2">
          <h2>🔄 Update Delivery Status</h2>
          <div className="update-form">
            <input
              type="text"
              placeholder="Enter tracking number"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Delivered</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
            <button onClick={updateStatus}>Update</button>
            {message && <p className="msg">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
