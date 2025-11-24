import React from "react";
import "./StatusBadge.css";

export function StatusBadge({ status }) {
  const color = {
    Pending: "orange",
    "In Transit": "blue",
    Delivered: "green",
    Cancelled: "red",
  }[status] || "gray";

  return <span className="status-badge" style={{ backgroundColor: color }}>{status}</span>;
}
