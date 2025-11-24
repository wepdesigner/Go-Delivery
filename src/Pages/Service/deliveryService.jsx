// src/services/deliveryService.js
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export async function exportAddDelivery(formData) {
  try {
    const res = await fetch(`${API_BASE}/delivery/add`, {
      method: "POST",
      body: formData, // FormData with image and fields
    });
    return await res.json();
  } catch (err) {
    console.error("exportAddDelivery error:", err);
    return { success: false, message: err.message };
  }
}

export async function exportGetAllDeliveries() {
  try {
    const res = await fetch(`${API_BASE}/delivery/all`);
    return await res.json();
  } catch (err) {
    console.error("exportGetAllDeliveries error:", err);
    return { success: false, message: err.message };
  }
}

export async function exportTrackDelivery(trackingNumber) {
  try {
    const res = await fetch(`${API_BASE}/delivery/track/${encodeURIComponent(trackingNumber)}`);
    return await res.json();
  } catch (err) {
    console.error("exportTrackDelivery error:", err);
    return { success: false, message: err.message };
  }
}
