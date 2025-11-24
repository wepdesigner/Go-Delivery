import React, { useState } from "react";
// import { exportLoginAgent } from "../Service/agentService";
import { exportLoginAgent } from "../Service/agentService";
import "./log.css";

export function DeliveryAgent() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await exportLoginAgent(form);
    if (res.success) {
      localStorage.setItem("agentToken", res.token);
      localStorage.setItem("loggedAgent", JSON.stringify(res.agent));
      window.location.href =
        res.agent.role === "admin" ? "/dashboard" : "/deliveryagent/agentdashboard";
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="agent-login-container">
      <div className="login-card">
        <h2>Agent Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
