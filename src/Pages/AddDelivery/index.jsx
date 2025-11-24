import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddDelivery.css";
import { Navbar2 } from "../../Components/Navbar2";

export function AddDelivery() {
  const [form, setForm] = useState({
    id: null,
    fullName: "",
    phone: "",
    email: "",
    status: "Pending",
    expeditionDate: "",
    deliveryDate: "",
    image: null,
    assignedTo: "",              // ➕ agent email
    assignedAgentName: "",       // ➕ agent name
  });

  const [deliveries, setDeliveries] = useState([]);
  const [agents, setAgents] = useState([]); // ➕ Load all agents
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load existing deliveries and agents
  useEffect(() => {
    const storedDeliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    const storedAgents = JSON.parse(localStorage.getItem("agents")) || [];
    setDeliveries(storedDeliveries);
    setAgents(storedAgents);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("deliveries", JSON.stringify(data));
    setDeliveries(data);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Generate unique tracking number
  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const rand = Math.floor(Math.random() * 900000 + 100000);
    return `${prefix}-${Date.now().toString().slice(-6)}-${rand}`;
  };

  // Submit (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.email) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    // 🔍 Find agent name by email
    const selectedAgent = agents.find((a) => a.email === form.assignedTo);

    const updatedForm = {
      ...form,
      assignedAgentName: selectedAgent ? selectedAgent.fullName : "",
    };

    let updatedList;

    if (isEditing) {
      updatedList = deliveries.map((d) =>
        d.id === form.id ? updatedForm : d
      );
      setMessage("✅ Delivery updated successfully!");
    } else {
      const newDelivery = {
        ...updatedForm,
        id: Date.now(),
        trackingNumber: generateTrackingNumber(),
      };
      updatedList = [...deliveries, newDelivery];
      setMessage("✅ Delivery created successfully!");
    }

    saveToStorage(updatedList);
    resetForm();
  };

  const handleEdit = (delivery) => {
    setForm(delivery);
    setPreview(delivery.image);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      const updatedList = deliveries.filter((d) => d.id !== id);
      saveToStorage(updatedList);
      setMessage("🗑️ Delivery deleted successfully!");
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      fullName: "",
      phone: "",
      email: "",
      status: "Pending",
      expeditionDate: "",
      deliveryDate: "",
      image: null,
      assignedTo: "",
      assignedAgentName: "",
    });
    setPreview(null);
    setIsEditing(false);
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
            <li><Link to="/adddelivery" className="nav-button active">Add Delivery</Link></li>
            <li><Link to="/clients" className="nav-button">Clients</Link></li>
            <li><Link to="/trackingpage" className="nav-button">Track</Link></li>
            <li><Link to="/agentregister" className="nav-button">Add Agents</Link></li>
            <li><Link to="/agentfeedback" className="nav-button">Agent Feedback</Link></li>
          </ul>
        </aside>

        {/* Main Form */}
        <div className="delivery-panel">
          <h2>{isEditing ? "✏️ Edit Delivery" : "➕ Add New Delivery"}</h2>
          {message && <p className="form-message">{message}</p>}

          <form className="delivery-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              
              <label>
                Full Name
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>

              {/* ➕ ASSIGN DELIVERY TO AGENT */}
              <label>
                Assign To Agent
                <select
                  name="assignedTo"
                  value={form.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Agent --</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.email}>
                      {agent.fullName} ({agent.email})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Expedition Date
                <input
                  type="date"
                  name="expeditionDate"
                  value={form.expeditionDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Delivery Date
                <input
                  type="date"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="file-upload">
                Picture of Goods
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {preview && (
                  <img src={preview} alt="Preview" className="preview-img" />
                )}
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isEditing ? "Update Delivery" : "Create Delivery"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* === All Deliveries List === */}
          <div className="delivery-list">
            <h3>📦 All Deliveries</h3>
            {deliveries.length === 0 ? (
              <p>No deliveries available.</p>
            ) : (
              <div className="delivery-grid">
                {deliveries.map((item) => (
                  <div className="delivery-card" key={item.id}>
                    <img
                      src={item.image || "/default-package.png"}
                      alt="Package"
                      className="delivery-thumb"
                    />

                    <h4>{item.fullName}</h4>
                    <p><strong>Status:</strong> {item.status}</p>
                    <p><strong>Agent:</strong> {item.assignedAgentName || "Not Assigned"}</p>
                    <p><strong>Tracking:</strong> {item.trackingNumber}</p>

                    <div className="card-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
