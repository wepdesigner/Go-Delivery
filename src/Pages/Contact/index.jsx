import React, { useState, useEffect } from "react";
import "./index.css";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

export function Contact() {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------- DARK MODE ---------- */
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  const validate = () => {
    const err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.phone) err.phone = "Phone is required";
    if (!form.message) err.message = "Message is required";
    return err;
  };

  const saveContact = (contact) => {
    const inbox = JSON.parse(localStorage.getItem("adminInbox") || "[]");
    inbox.unshift(contact);
    localStorage.setItem("adminInbox", JSON.stringify(inbox));
  };

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors");
      return;
    }

    saveContact({
      id: uuidv4(),
      ...form,
      createdAt: new Date().toISOString(),
      status: "unread",
    });

    toast.success("Message sent successfully!");
    setErrors({});
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <main className="page contact-page">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <button className="dark-toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="contact-grid">
          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={onChange}
              className={errors.name ? "invalid" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}

            <input
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={onChange}
              className={errors.phone ? "invalid" : ""}
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}

            <input
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={onChange}
            />

            <textarea
              name="message"
              placeholder="Your Message *"
              value={form.message}
              onChange={onChange}
              className={errors.message ? "invalid" : ""}
            />
            {errors.message && (
              <span className="error-text">{errors.message}</span>
            )}

            <button className="btn primary" type="submit">
              Send Message
            </button>
          </form>

          {/* INFO + MAP */}
          <div className="contact-info">
            <h4>Fast Contact</h4>
            <p>📞 +237 676 865 110</p>
            <p>📧 go-delivery@gmail.com</p>
            <p>
              💬{" "}
              <a href="https://wa.me/237676865110" target="_blank" rel="noreferrer">
                WhatsApp Chat
              </a>
            </p>

            <div className="hours">
              <strong>Working Hours</strong>
              <p>Mon - Sun: 06:00 - 22:00</p>
            </div>

            {/* MAP */}
            <div className="map">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=Douala%20Cameroon&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
