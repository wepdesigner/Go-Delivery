// src/services/deliveryService.js
export async function exportAddDelivery(data) {
  try {
    const response = await fetch("http://localhost:5000/api/delivery/add", {
      method: "POST",
      body: data,
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding delivery:", error);
    return { success: false };
  }
}
