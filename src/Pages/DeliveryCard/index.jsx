import React from "react";
// import "./DeliveryCard.css";

export function DeliveryCard({ delivery }) {
  return (
    <div className="delivery-card">
      <h3>{delivery.recipientName}</h3>
      <p>Tracking: {delivery.trackingNumber}</p>
      <p>Status: <span className={`status ${delivery.status.toLowerCase()}`}>{delivery.status}</span></p>
    </div>
  );
}
