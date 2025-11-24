import React, { useState } from 'react';
import './index.css';
import { Link, Links } from 'react-router-dom';
import { User } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar2">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/landing"><img src="../../../public/images/deliver.png" alt="" /></Link>
        </div>

        <nav className={`nav-links ${open ? 'active' : ''}`}>
          <Link to="/landing" className="nav-button2">Home</Link>
          <Link to="/about" className="nav-button2">About</Link>
          <Link to="/service" className="nav-button2">Service</Link>
          <Link to="/tracking" className="nav-button2">Tracking</Link>
          <Link to="/contact" className="nav-button2">Contact Us</Link>
          <a href="/userdashboard" className="nav-item active"><User size={16}/> Dashboard</a>
        </nav>

        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
}
