

import React, { useEffect, useState } from "react";
import "./RecentDeliveries.css";

export default function RecentDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("deliveries") || "[]");
    const recent = stored.slice(-5).reverse(); // latest 5
    setDeliveries(recent);
  }, []);

  return (
    <div className="recent-deliveries">
      <h3>Recent Deliveries</h3>
      {deliveries.length === 0 ? (
        <p>No recent deliveries.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tracking #</th>
              <th>Client</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d, i) => (
              <tr key={i}>
                <td>{d.trackingNumber}</td>
                <td>{d.fullName}</td>
                <td>{d.status}</td>
                <td>{d.deliveryDate || d.expeditionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
