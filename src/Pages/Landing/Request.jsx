import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "../../Components/Navbar";
import './user.css'

export default function RequestDelivery({ onNewRequest }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pickup: "",
    delivery: "",
    description: "",
    weight: "",
    urgency: "Normal",
  });
  const [success, setSuccess] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveDelivery = (delivery) => {
    const existing = JSON.parse(localStorage.getItem("deliveries") || "[]");

    // Add delivery without changing existing tracking numbers
    const updated = [...existing, delivery];
    localStorage.setItem("deliveries", JSON.stringify(updated));
    return updated;
  };

  const saveContact = (contact) => {
    const existing = JSON.parse(localStorage.getItem("contacts") || "[]");
    const updated = [...existing, contact];
    localStorage.setItem("contacts", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Only generate tracking once
    const tracking = "TRK-" + Math.floor(Math.random() * 1000000);
    const delivery = {
      id: uuidv4(),
      ...form,
      tracking,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updatedDeliveries = saveDelivery(delivery);

    // Notify admin
    saveContact({
      id: uuidv4(),
      name: form.fullName,
      phone: form.phone,
      message: `New delivery request - ${tracking}`,
      createdAt: new Date().toISOString(),
    });

    setSuccess({ ok: true, message: `Request submitted. Tracking ID: ${tracking}` });
    setForm({ fullName: "", phone: "", pickup: "", delivery: "", description: "", weight: "", urgency: "Normal" });

    if (onNewRequest) onNewRequest(updatedDeliveries);
  };

  return (
    <>
      <Navbar/>
      <main className="page form-page">
        <h2>Request a Delivery</h2>
        <form className="delivery-form" onSubmit={handleSubmit}>
          <label>Full Name*</label>
          <input name="fullName" value={form.fullName} onChange={onChange} required />

          <label>Phone*</label>
          <input name="phone" value={form.phone} onChange={onChange} required />

          <label>Pickup Location*</label>
          <input name="pickup" value={form.pickup} onChange={onChange} required />

          <label>Delivery Location*</label>
          <input name="delivery" value={form.delivery} onChange={onChange} required />

          <label>Package Description</label>
          <textarea name="description" value={form.description} onChange={onChange} />

          <label>Weight (kg)</label>
          <input name="weight" value={form.weight} onChange={onChange} />

          <label>Urgency</label>
          <select name="urgency" value={form.urgency} onChange={onChange}>
            <option>Normal</option>
            <option>Express</option>
          </select>

          <div className="form-actions">
            <button className="btn primary" type="submit">Confirm Request</button>
          </div>

          {success && (
            <div className={`notice ${success.ok ? 'ok' : 'err'}`}>{success.message}</div>
          )}
        </form>

        <aside className="side-card">
          <h4>Need it faster?</h4>
          <p>Click to open WhatsApp and message us to arrange an express pickup.</p>
          <a
            className="btn"
            href={`https://wa.me/237676865110?text=${encodeURIComponent('Hello, I need express pickup')}`}
            target="blank"
            rel="noreferrer"
          >
            WhatsApp Express
          </a>
        </aside>
      </main>
    </>
  );
}
