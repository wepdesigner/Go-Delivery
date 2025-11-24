import React from "react";
import './index.css'
import "./Sidebar.css";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>Overview</li>
        <li>Pending Deliveries</li>
        <li>In Transit</li>
        <li>Delivered</li>
      </ul>
    </aside>
  );
}
