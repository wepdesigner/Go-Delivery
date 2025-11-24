

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav2.css";
import { Menu, X } from "lucide-react"; // for icons (install with: npm i lucide-react)

export function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar2">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="logo2">
          <Link to="">
            <img src="public\images\deliver.png" alt="Deliverly Logo" />
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Nav Links */}
        <Link to="/" onClick={()=>localStorage.removeItem("isAdminLoggedIn")}>
          LogOut
        </Link>
      </div>
    </nav>
  );
}
