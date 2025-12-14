// src/pages/Register.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../../Utils/userStorage";
import { useNavigate } from "react-router-dom";
import "./index.css"; // CSS provided below

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    vehicleType: "",
    licensePlate: "",
    yearsOfExperience: "",
    preferredArea: { local: false, regional: false, national: false, other: false },
    preferredTime: "Morning",
  });
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("preferredArea.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, preferredArea: { ...f.preferredArea, [key]: checked } }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError("Please complete required fields (name, email, phone).");
      return;
    }

    // Create user object
    const id = uuidv4();
    const user = {
      id,
      firstName: form.firstName,
      lastName: form.lastName,
      fullName: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      state: form.state,
      postal: form.postal,
      vehicleType: form.vehicleType,
      licensePlate: form.licensePlate,
      yearsOfExperience: form.yearsOfExperience,
      preferredArea: form.preferredArea,
      preferredTime: form.preferredTime,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage via utility
    createUser(user);

    // Auto-login (store current user) so dashboard can read it
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to user dashboard
    navigate(`/landing/${id}/userdashboard`);
  };

  return (
    <main className="register-page">
      <div className="register-card">
        <div className="register-hero" style={{ backgroundImage: `url("/mnt/data/Screenshot 2025-11-25 143431.png")` }}>
          <h1>Courier Registration Form</h1>
          <p>Please fill out the following information to register as a courier.</p>
        </div>

        <form className="reg-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="row two">
            <div>
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={onChange} required />
            </div>
            <div>
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={onChange} required />
            </div>
          </div>

          <div className="row two">
            <div>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={onChange} required />
            </div>
          </div>

          <div className="row">
            <label>Address - Street</label>
            <input name="address1" value={form.address1} onChange={onChange} />
          </div>

          <div className="row">
            <label>Address - Street 2</label>
            <input name="address2" value={form.address2} onChange={onChange} />
          </div>

          <div className="row two">
            <div>
              <label>City</label>
              <input name="city" value={form.city} onChange={onChange} />
            </div>
            <div>
              <label>State / Province</label>
              <input name="state" value={form.state} onChange={onChange} />
            </div>
          </div>

          <div className="row">
            <label>Postal / Zip Code</label>
            <input name="postal" value={form.postal} onChange={onChange} />
          </div>

          <div className="row two">
            <div>
              <label>Vehicle Type</label>
              <select name="vehicleType" value={form.vehicleType} onChange={onChange}>
                <option value="">Please Select</option>
                <option>Motorbike</option>
                <option>Car</option>
                <option>Van</option>
                <option>Bicycle</option>
              </select>
            </div>
            <div>
              <label>License Plate Number</label>
              <input name="licensePlate" value={form.licensePlate} onChange={onChange} />
            </div>
          </div>

          <div className="row">
            <label>Years of Experience</label>
            <input name="yearsOfExperience" value={form.yearsOfExperience} onChange={onChange} />
          </div>

          <div className="row two">
            <div>
              <label>Preferred Delivery Area</label>
              <div className="checkboxes">
                <label><input type="checkbox" name="preferredArea.local" checked={form.preferredArea.local} onChange={onChange} /> Local</label>
                <label><input type="checkbox" name="preferredArea.regional" checked={form.preferredArea.regional} onChange={onChange} /> Regional</label>
                <label><input type="checkbox" name="preferredArea.national" checked={form.preferredArea.national} onChange={onChange} /> National</label>
                <label><input type="checkbox" name="preferredArea.other" checked={form.preferredArea.other} onChange={onChange} /> Other</label>
              </div>
            </div>

            <div>
              <label>Preferred Delivery Time</label>
              <div className="radios">
                <label><input type="radio" name="preferredTime" value="Morning" checked={form.preferredTime === "Morning"} onChange={onChange} /> Morning</label>
                <label><input type="radio" name="preferredTime" value="Afternoon" checked={form.preferredTime === "Afternoon"} onChange={onChange} /> Afternoon</label>
                <label><input type="radio" name="preferredTime" value="Evening" checked={form.preferredTime === "Evening"} onChange={onChange} /> Evening</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary">Submit</button>
          </div>
        </form>
      </div>
    </main>
  );
}
