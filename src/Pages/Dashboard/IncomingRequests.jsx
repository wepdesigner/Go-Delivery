import React, { useEffect, useState } from "react";
import './l.css'
import { Link } from "lucide-react";
import { Navbar2 } from "../../Components/Navbar2";

export default function IncomingRequests({ onSelectRequest }) {
  const [requests, setRequests] = useState([]);
  const [newIds, setNewIds] = useState([]); // To highlight new incoming requests

  useEffect(() => {
    loadRequests();

    // Listen for localStorage changes (new requests from UserDashboard)
    const handleStorage = () => {
      loadRequests(true);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const loadRequests = (highlightNew = false) => {
    const data = JSON.parse(localStorage.getItem("deliveries") || "[]");
    setRequests(data);

    if (highlightNew && data.length > 0) {
      const ids = data.map(r => r.id);
      setNewIds(ids); // temporarily highlight all
      setTimeout(() => setNewIds([]), 5000); // highlight fades after 5s
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending": return "badge pending";
      case "Delivered": return "badge delivered";
      case "Cancelled": return "badge cancelled";
      case "In Transit": return "badge transit";
      default: return "badge";
    }
  };

  return (
    <>
    <Navbar2/>
    <aside className="dashboard-sidebar">
          <h3>Admin Panel</h3>
          <ul>
            <li>
              <Link to="/dashboard" className="nav-button active">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/adddelivery" className="nav-button">
                Add Delivery
              </Link>
            </li>
            <li>
              <Link to="/clients" className="nav-button">
                Clients
              </Link>
            </li>
            <li>
              <Link to="/trackingpage" className="nav-button">
                Track
              </Link>
            </li>
            <li>
              <Link to="/agentregister" className="nav-button">
                AddAgent
              </Link>
            </li>
            <li>
              <Link to="/agentfeedback" className="nav-button">
                Agents Feedback
              </Link>
            </li>
            <li>
              <Link to="/incomingrequests" className="nav-button">
                Requests
              </Link>
            </li>
          </ul>
        </aside>
    <div className="incoming-requests">
        
      <h4>Incoming Delivery Requests</h4>
      {requests.length === 0 && <p>No requests yet.</p>}
      {requests.map((req) => (
        <div
          key={req.id}
          className={`req-card ${newIds.includes(req.id) ? "new-highlight" : ""}`}
          onClick={() => onSelectRequest(req)}
        >
          <div className="req-top">
            <h5>Tracking: {req.tracking}</h5>
            <span className={statusColor(req.status)}>{req.status}</span>
          </div>
          <p><strong>Name:</strong> {req.fullName}</p>
          <p><strong>Pickup:</strong> {req.pickup}</p>
          <p><strong>Delivery:</strong> {req.delivery}</p>
        </div>
      ))}
    </div>
    </>
  );
}
