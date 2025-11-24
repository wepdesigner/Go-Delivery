// src/Pages/Service/agentService.js

export const exportLoginAgent = async ({ email, password }) => {
  const agents = JSON.parse(localStorage.getItem("agents") || "[]");
  const admin = { email: "admin@gmail.com", password: "12345678", role: "admin" };

  // Check for admin
  if (email === admin.email && password === admin.password) {
    return { success: true, agent: admin, token: "admin-token" };
  }

  // Check for delivery agent
  const found = agents.find(a => a.email === email && a.password === password);
  if (found) {
    return { success: true, agent: found, token: "agent-token" };
  }

  return { success: false, message: "Invalid credentials" };
};

export const exportRegisterAgent = async (agentData) => {
  const agents = JSON.parse(localStorage.getItem("agents") || "[]");
  const exists = agents.find(a => a.email === agentData.email);

  if (exists) return { success: false, message: "Agent already exists" };

  const newAgent = { ...agentData, id: Date.now(), deliveries: [] };
  agents.push(newAgent);
  localStorage.setItem("agents", JSON.stringify(agents));

  return { success: true, agent: newAgent };
};

export const exportGetAgentDeliveries = async (agentEmail) => {
  const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
  return deliveries.filter(d => d.assignedTo === agentEmail);
};

export const exportUpdateDeliveryStatus = async (deliveryId, status, note, proof) => {
  const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
  const index = deliveries.findIndex(d => d.id === deliveryId);
  if (index !== -1) {
    deliveries[index].status = status;
    deliveries[index].note = note;
    deliveries[index].proof = proof;
    localStorage.setItem("deliveries", JSON.stringify(deliveries));
    return { success: true };
  }
  return { success: false, message: "Delivery not found" };
};
