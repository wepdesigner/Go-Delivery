import React, { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded Admin Credentials
    if (form.email === "admin@gmail.com" && form.password === "admin") {
      localStorage.setItem("isAdminLoggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      setError("Invalid admin email or password!");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}
