import React, { useEffect, useState } from "react";
import AgentSidebar from "./AgentSidebar";
import * as XLSX from "xlsx";
import "./Report.css";

export default function Report() {
  const [agent, setAgent] = useState(null);
  const [activities, setActivities] = useState([]);

  // Load agent + activity logs
  useEffect(() => {
    const loggedAgent = JSON.parse(localStorage.getItem("loggedAgent"));
    setAgent(loggedAgent);

    if (!loggedAgent) return;

    const deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];

    // Load only their own deliveries
    const myActivities = deliveries.filter(
      (d) =>
        d.assignedTo === loggedAgent.email ||
        d.assignedDelivery?.includes(loggedAgent.fullName)
    );

    setActivities(myActivities);
  }, []);

  // Export Excel File
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(activities);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Activities");

//     XLSX.writeFile(
//       workbook,
//       `${agent.fullName.replace(/\s+/g, "_")}_Activity_Report.xlsx`
//     );
//   };


const exportToExcel = () => {
  if (!activities || activities.length === 0) {
    alert("Aucune activité à exporter.");
    return;
  }

  // --- Helper pour limiter les longs textes ---
  const trimText = (value) => {
    if (typeof value === "string" && value.length > 32000) {
      return value.substring(0, 32000) + " ...";
    }
    return value;
  };

  // --- Nettoyage des données avant export ---
  const safeActivities = activities.map(item => {
    const cleaned = {};

    for (let key in item) {
      let value = item[key];

      // Retirer les images base64 ou autres champs trop lourds
      if (key.toLowerCase().includes("photo") || key.toLowerCase().includes("image")) {
        continue;
      }

      // Convertir objets imbriqués en texte
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }

      cleaned[key] = trimText(value);
    }

    return cleaned;
  });

  // --- Génération du fichier Excel ---
  const worksheet = XLSX.utils.json_to_sheet(safeActivities);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Activities");

  // --- Nom du fichier ---
  const filename = `${agent.fullName.replace(/\s+/g, "_")}_Activity_Report.xlsx`;

  // --- Export ---
  XLSX.writeFile(workbook, filename);
};


  if (!agent) return <p className="loading">No agent found.</p>;

  return (
    <div className="report-page">
      <AgentSidebar />

      <div className="report-container">
        <h2>📄 Activity Report for {agent.fullName}</h2>

        <button className="download-btn" onClick={exportToExcel}>
          ⬇️ Download Excel Report
        </button>

        <div className="table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Delivery ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Address</th>
                <th>Date Assigned</th>
              </tr>
            </thead>

            <tbody>
              {activities.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No activity found.
                  </td>
                </tr>
              )}

              {activities.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.customerName}</td>
                  <td className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </td>
                  <td>{item.address}</td>
                  <td>{item.date || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
