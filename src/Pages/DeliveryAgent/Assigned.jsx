// import React, { useEffect, useState } from "react";
// import AgentNavbar from "./AgentNavbar";
// import AgentSidebar from "./AgentSidebar";
// import "./assigned.css";

// export default function Assigned() {
//   const [deliveries, setDeliveries] = useState([]);
//   const agent = JSON.parse(localStorage.getItem("loggedAgent"));

//   useEffect(() => {
//     const all = JSON.parse(localStorage.getItem("deliveries")) || [];
//     const assigned = all.filter(
//       (d) =>
//         d.assignedTo === agent.email ||
//         d.assignedDelivery?.includes(agent.fullName)
//     );
//     setDeliveries(assigned);
//   }, [agent]);

//   return (
//     <div className="agent-layout">
//       <AgentSidebar />
//       <div className="agent-main">
//         <AgentNavbar />
//         <div className="agent-page">
//           <h2>📦 Assigned Deliveries</h2>
//           <div className="delivery-list">
//             {deliveries.length === 0 ? (
//               <p>No deliveries assigned yet.</p>
//             ) : (
//               deliveries.map((d) => (
//                 <div key={d.id} className="delivery-card">
//                   <img src={d.image || "/default-package.png"} alt="delivery" />
//                   <div>
//                     <h4>{d.fullName}</h4>
//                     <p><strong>Status:</strong> {d.status}</p>
//                     <p><strong>Tracking:</strong> {d.trackingNumber}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import AgentNavbar from "./AgentNavbar";
import AgentSidebar from "./AgentSidebar";
import "./Assigned.css";

export default function Assigned() {
  const [deliveries, setDeliveries] = useState([]);
  const agent = JSON.parse(localStorage.getItem("loggedAgent"));

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("deliveries")) || [];

    const assigned = all.filter(
      (d) =>
        d.assignedTo === agent?.email ||
        d.assignedDelivery?.includes(agent?.fullName)
    );

    setDeliveries(assigned);
  }, []);

  const updateStatus = (id, newStatus) => {
    const all = JSON.parse(localStorage.getItem("deliveries")) || [];

    const updated = all.map((d) =>
      d.id === id ? { ...d, status: newStatus } : d
    );

    localStorage.setItem("deliveries", JSON.stringify(updated));

    const newAssigned = updated.filter(
      (d) =>
        d.assignedTo === agent?.email ||
        d.assignedDelivery?.includes(agent?.fullName)
    );

    setDeliveries(newAssigned);
  };

  return (
    <div className="agent-layout">
      <AgentSidebar />
      <div className="agent-main">
        <AgentNavbar />

        <div className="agent-page">
          <h2>📦 Assigned Deliveries</h2>

          <div className="delivery-list">
            {deliveries.length === 0 ? (
              <p>No deliveries assigned yet.</p>
            ) : (
              deliveries.map((d) => (
                <div key={d.id} className="delivery-card">
                  <img src={d.image || "/default-package.png"} alt="delivery" />

                  <div className="delivery-info">
                    <h4>{d.fullName}</h4>

                    {/* Status Tag */}
                    <span
                      className={`status-tag ${d.status.toLowerCase()}`}
                    >
                      {d.status}
                    </span>

                    <p><strong>Tracking:</strong> {d.trackingNumber}</p>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="delivery-actions">
                    <button
                      className="btn-view"
                      onClick={() => alert(JSON.stringify(d, null, 2))}
                    >
                      View
                    </button>

                    {d.status !== "Delivered" && (
                      <button
                        className="btn-delivered"
                        onClick={() => updateStatus(d.id, "Delivered")}
                      >
                        Mark Delivered
                      </button>
                    )}

                    {d.status !== "Cancelled" && (
                      <button
                        className="btn-cancelled"
                        onClick={() => updateStatus(d.id, "Cancelled")}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
