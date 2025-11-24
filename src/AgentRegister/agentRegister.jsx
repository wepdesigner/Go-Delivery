import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AgentPanel.css";
import { Navbar2 } from "../Components/Navbar2";

export function AgentRegister() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "", // ✅ Added
    photo: "",
    assignedDelivery: "",
  });
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  // Load agents from localStorage
  useEffect(() => {
    const storedAgents = JSON.parse(localStorage.getItem("agents")) || [];
    setAgents(storedAgents);
  }, []);

  // Save agents to localStorage
  const saveAgents = (updated) => {
    setAgents(updated);
    localStorage.setItem("agents", JSON.stringify(updated));
  };

  // Handle adding a new agent
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password || !form.phone) {
      setMessage("❌ Please fill all required fields.");
      return;
    }

    const newAgent = {
      id: Date.now(),
      ...form,
      photo: form.photo || "/default-avatar.png",
      assignedDelivery: "",
    };

    const updated = [...agents, newAgent];
    saveAgents(updated);
    setMessage("✅ Agent added successfully!");
    setForm({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      photo: "",
      assignedDelivery: "",
    });
    setPreview(null);
  };

  // Handle deleting an agent
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      const updated = agents.filter((a) => a.id !== id);
      saveAgents(updated);
      setMessage("🗑️ Agent deleted successfully!");
    }
  };

  // Handle assigning a delivery to an agent
  const handleAssign = (id) => {
    const delivery = prompt("Enter delivery task details:");
    if (delivery) {
      const updated = agents.map((a) =>
        a.id === id ? { ...a, assignedDelivery: delivery } : a
      );
      saveAgents(updated);
      setMessage("🚚 Delivery assigned successfully!");
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <Navbar2/>

    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li><Link to="/dashboard" className="nav-button">Dashboard</Link></li>
          <li><Link to="/adddelivery" className="nav-button">Add Delivery</Link></li>
          <li><Link to="/clients" className="nav-button">Clients</Link></li>
          <li><Link to="/trackingpage" className="nav-button">Track</Link></li>
          <li><Link to="/agentregister" className="nav-button active">Add Agents</Link></li>
          <li><Link to="/agentfeedback" className="nav-button">Agents Feedback</Link></li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="register-container2">
        <h2>Agent Management</h2>
        {message && <p className="msg">{message}</p>}

        {/* Add Agent Form */}
        <form onSubmit={handleSubmit} className="agent-form">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Profile Picture Upload */}
          <div className="upload-section">
            <label htmlFor="photo-upload">Upload Profile Photo:</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            {preview && <img src={preview} alt="Preview" className="preview-img" />}
          </div>

          <button type="submit" className="btn-add">Add Agent</button>
        </form>

        {/* Agent List */}
        <div className="agent-list">
          <h3>Registered Agents</h3>
          {agents.length === 0 ? (
            <p>No agents registered yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th> {/* ✅ Added column */}
                  <th>Assigned Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td>
                      <img
                        src={agent.photo || "/default-avatar.png"}
                        alt={agent.fullName}
                        className="agent-photo"
                      />
                    </td>
                    <td>{agent.fullName}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>{agent.assignedDelivery || "—"}</td>
                    <td>
                      <button
                        className="btn-assign"
                        onClick={() => handleAssign(agent.id)}
                      >
                        Assign
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(agent.id)}
                      >
                        Delete
                      </button>
                    </td>
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
