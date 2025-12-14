import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "../../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import "./user.css";

export default function RequestDelivery({ onNewRequest }) {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pickup: "",
    delivery: "",
    description: "",
    weight: "",
    size: "Small",
    urgency: "Normal",
  });

  const [cost, setCost] = useState(0);

  /* ---------------- DARK MODE ---------------- */
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  /* ---------------- COST ESTIMATOR ---------------- */
  useEffect(() => {
    let base = 2000;
    if (form.size === "Medium") base += 1000;
    if (form.size === "Large") base += 2000;
    if (form.urgency === "Express") base += 1500;
    if (form.weight) base += Number(form.weight) * 200;

    setCost(base);
  }, [form]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Generate tracking number
  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${prefix}-${Date.now()}-${randomNum}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tracking = generateTrackingNumber();
    const delivery = {
      id: uuidv4(),
      ...form,
      tracking,
      cost,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("deliveries") || "[]");
    localStorage.setItem("deliveries", JSON.stringify([...existing, delivery]));

    toast.success(`Request submitted! Tracking ID: ${tracking}`);

    setForm({
      fullName: "",
      phone: "",
      pickup: "",
      delivery: "",
      description: "",
      weight: "",
      size: "Small",
      urgency: "Normal",
    });

    if (onNewRequest) onNewRequest(delivery);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <main className="page form-page">
        <div className="form-header">
          <h2>Request a Delivery</h2>
          <button className="dark-toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="form-layout">
          <form className="delivery-form" onSubmit={handleSubmit}>
            {/* USER INFO */}
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={onChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={onChange}
              required
            />

            {/* 📍 PICKUP AUTOCOMPLETE (LOCAL SAFE VERSION) */}
            <input
              name="pickup"
              list="locations"
              placeholder="Pickup Location"
              value={form.pickup}
              onChange={onChange}
              required
            />
            <datalist id="locations">
              <option value="Douala - Bonamoussadi" />
              <option value="Yaoundé - Bastos" />
              <option value="Buea - Molyko" />
              <option value="Bamenda - Commercial Ave" />
              <option value="Douala - Yaounde" />
            </datalist>

            <input
              name="delivery"
              list="locations"
              placeholder="Delivery Location"
              value={form.delivery}
              onChange={onChange}
              required
            />
            

            {/* 📦 PACKAGE SIZE */}
            <select name="size" value={form.size} onChange={onChange}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>

            <input
              name="weight"
              placeholder="Weight (kg)"
              value={form.weight}
              onChange={onChange}
            />

            <select name="urgency" value={form.urgency} onChange={onChange}>
              <option>Normal</option>
              <option>Express</option>
            </select>

            <textarea
              name="description"
              placeholder="Package description"
              value={form.description}
              onChange={onChange}
            />

            {/* 🧾 COST ESTIMATE */}
            <div className="cost-box">
              Estimated Cost: <strong>{cost.toLocaleString()} FCFA</strong>
            </div>

            <button className="btn primary" type="submit">
              Confirm Request
            </button>
          </form>

          {/* SIDE CARD */}
          <aside className="side-card">
            <h4>Need it faster?</h4>
            <p>Contact us directly on WhatsApp for express pickup.</p>
            <a
              className="btn"
              href="https://wa.me/237676865110?text=Hello%2C%20I%20want%20to%20send%20a%20package"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Express
            </a>
          </aside>
        </div>
      </main>
    </>
  );
}

