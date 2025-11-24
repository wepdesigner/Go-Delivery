import React, { useState } from "react";
import './index.css'
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";

export function Contact(){

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
const [sent, setSent] = useState(null);


const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = (e) => {
e.preventDefault();
if (!form.name || !form.phone || !form.message) {
setSent({ ok: false, message: 'Please fill required fields.' });
return;
}


saveContact({ id: uuidv4(), ...form, createdAt: new Date().toISOString() });
setSent({ ok: true, message: 'Message sent. We will contact you shortly.' });
setForm({ name: '', phone: '', email: '', message: '' });
};

    return(
        <>
        <Navbar />
            
                {/*  */}

                {/* <section className="contact-container">
      <div className="contact-image">
        <img src="public\images\ware-1024x535-1.webp" alt="Contact Visual" />
      </div>

      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" name="fullname" placeholder="Enter Full Name" required />
          <input type="tel" name="phone" placeholder="Enter Phone Number" required />
          <input type="email" name="email" placeholder="Enter Email" required />
          <input type="text" name="service" placeholder="Service Description" required />
          <textarea name="message" placeholder="Your Message..." rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section> */}

    <main className="page contact-page">
<h2>Contact Us</h2>
<div className="contact-grid">
<form className="contact-form" onSubmit={handleSubmit}>
<label>Name*</label>
<input name="name" value={form.name} onChange={onChange} />


<label>Phone*</label>
<input name="phone" value={form.phone} onChange={onChange} />


<label>Email</label>
<input name="email" value={form.email} onChange={onChange} />


<label>Message*</label>
<textarea name="message" value={form.message} onChange={onChange} />


<div className="form-actions">
<button className="btn primary" type="submit">Send Message</button>
</div>


{sent && <div className={`notice ${sent.ok ? 'ok' : 'err'}`}>{sent.message}</div>}
</form>


<div className="contact-info">
<h4>Fast Contact</h4>
<p>Phone: <a href="tel:+237676865110">+237 676 865 110</a></p>
<p>Email: <a href="email:go-delivery@gmail.com">go-delivery@gmail.com</a></p>
<p>WhatsApp: <a href="https://wa.me/237676865110">Open Chat</a></p>


<div className="hours">
<strong>Working Hours</strong>
<p>Mon - Sun: 06:00 - 22:00</p>
</div>
</div>
</div>
</main>



        <Footer />
        </>
    );
}