import React from "react";
import "./AgentNavbar.css";

export default function AgentNavbar() {
  return (
    <header className="agent-navbar2">
      <h3>Delivery Agent Portal</h3>
      <div className="navbar-right">
        
        <div className="nav-notify">
          <i className="ri-notification-3-line"></i>
        </div>

        <div className="nav-profile">
          <img
            src={JSON.parse(localStorage.getItem("loggedAgent"))?.photo || "/default-avatar.png"}
            alt="avatar"
          />
        </div>
      </div>
    </header>
  );
}
