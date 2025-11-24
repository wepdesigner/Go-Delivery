// src/components/ClientDeliveryPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./client.css";
import { Navbar2 } from "../../Components/Navbar2";

export function Clients() {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [message, setMessage] = useState("");

  // Load deliveries
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("deliveries")) || [];
    setDeliveries(stored);
  }, []);

  // Open modal for editing
  const handleEdit = (client) => {
    setSelectedClient(client);
    setUpdatedInfo({ ...client });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Save updates
  const handleSave = () => {
    const updatedList = deliveries.map((d) =>
      d.id === updatedInfo.id ? updatedInfo : d
    );
    localStorage.setItem("deliveries", JSON.stringify(updatedList));
    setDeliveries(updatedList);
    setMessage("✅ Client information updated successfully!");
    setSelectedClient(null);
    setTimeout(() => setMessage(""), 2500);
  };

  // Close modal
  const closeModal = () => {
    setSelectedClient(null);
  };

  return (
    <>
      <Navbar2 />

      <div className="dashboard-page">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <h3>Admin Panel</h3>
          <ul>
            <li><Link to="/dashboard" className="nav-button">Dashboard</Link></li>
            <li><Link to="/adddelivery" className="nav-button">Add Delivery</Link></li>
            <li><Link to="/clients" className="nav-button active">Clients</Link></li>
            <li><Link to="/trackingpage" className="nav-button">Track</Link></li>
            <li><Link to="/agentregister" className="nav-button">Agents</Link></li>
            <li><Link to="/agentfeedback" className="nav-button">Agents Feedback</Link></li>
          </ul>
        </aside>

        {/* Main content */}
        <div className="client-delivery-pages">
          <h2>All Registered Clients</h2>
          {message && <p className="msg">{message}</p>}
          {deliveries.length === 0 ? (
            <p>No deliveries available.</p>
          ) : (
            <div className="delivery-grids">
              {deliveries.map((item) => (
                <div className="delivery-card" key={item.id}>
                  <img
                    src={item.image || "/default-package.png"}
                    alt="Package"
                    className="delivery-img"
                  />
                  <h3>{item.fullName}</h3>
                  <p><strong>Phone:</strong> {item.phone}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>Expedition:</strong> {item.expeditionDate}</p>
                  <p><strong>Delivery:</strong> {item.deliveryDate}</p>
                  <p className="tracking">
                    <strong>Tracking:</strong> {item.trackingNumber}
                  </p>
                  <button className="btn-edit" onClick={() => handleEdit(item)}>✏️ Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {selectedClient && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Client Information</h3>
              <label>
                Full Name:
                <input
                  name="fullName"
                  value={updatedInfo.fullName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  name="phone"
                  value={updatedInfo.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedInfo.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={updatedInfo.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Deliver">Deliver</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </label>
              <label>
                Expedition Date:
                <input
                  type="date"
                  name="expeditionDate"
                  value={updatedInfo.expeditionDate}
                  onChange={handleChange}
                />
              </label>
              <label>
                Delivery Date:
                <input
                  type="date"
                  name="deliveryDate"
                  value={updatedInfo.deliveryDate}
                  onChange={handleChange}
                />
              </label>
              <div className="modal-buttons">
                <button className="btn-save" onClick={handleSave}>💾 Save</button>
                <button className="btn-cancel" onClick={closeModal}>❌ Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
