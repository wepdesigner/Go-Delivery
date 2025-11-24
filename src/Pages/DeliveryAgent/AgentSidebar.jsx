

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./AgentLayout.css";

// export default function AgentSidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   const menuItems = [
    

//     { path: "/deliveryagent/agentprofile", label: "Agent Profile", icon: "👤" },
//     { path: "/deliveryagent/assigned", label: "Assigned Deliveries", icon: "📦" },
//     // { path: "/deliveryagent/details", label: "Delivery Details", icon: "📋" },
//     { path: "/deliveryagent/update", label: "Update Status", icon: "🔄" },
//   ];

//   return (
//     <aside className={`agent-sidebar ${collapsed ? "collapsed" : ""}`}>
//       <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
//         ☰
//       </button>
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={location.pathname === item.path ? "active" : ""}
//             >
//               <span className="icon">{item.icon}</span>
//               {!collapsed && <span>{item.label}</span>}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }



import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../DeliveryAgent/AgentSidebar.css";

export default function AgentSidebar() {
  return (
    <aside className="agent-sidebar">
      <h2 className="sidebar-title"> <div className="logo">
          <Link to="/deliveryagent/agentdashboard"><img src="../../../public/images/deliver.png" alt="" /></Link>
        </div> Agent Panel</h2>

      <nav className="sidebar-nav">
        <NavLink to="/deliveryagent/agentdashboard" className="sidebar-link">
          <i className="ri-dashboard-line"></i> Dashboard
        </NavLink>

        <NavLink to="/deliveryagent/agentprofile" className="sidebar-link">
          <i className="ri-user-3-line"></i> Profile
        </NavLink>

        <NavLink to="/deliveryagent/assigned" className="sidebar-link">
          <i className="ri-truck-line"></i> Assigned Deliveries
        </NavLink>



        {/* <NavLink to="/deliveryagent/history" className="sidebar-link">
          <i className="ri-file-list-3-line"></i> Delivery History
        </NavLink> */}

        <NavLink to="/deliveryagent/update" className="sidebar-link">
          <i className="ri-edit-line"></i> Update Status
        </NavLink>   
        
             <NavLink to="/deliveryagent/report" className="sidebar-link">
          <i className="ri-truck-line"></i> Report
        </NavLink>
      </nav>
    </aside>
  );
}
