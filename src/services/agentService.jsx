const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/agent";

export async function exportLoginAgent(credentials) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: err.message };
  }
}

export async function exportGetAssignedDeliveries(agentId) {
  try {
    const res = await fetch(`${API_BASE}/deliveries/${agentId}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}

export async function exportUpdateDeliveryStatus(deliveryId, status) {
  try {
    const res = await fetch(`${API_BASE}/status/${deliveryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: err.message };
  }
}
