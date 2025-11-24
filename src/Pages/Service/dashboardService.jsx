// src/services/dashboardService.js
// export async function getDashboardData() {
//   try {
//     const response = await fetch("http://localhost:5000/api/dashboard");
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     return { success: false };
//   }
// }




// src/services/dashboardService.js
const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export async function getDashboardData() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    return await res.json();
  } catch (err) {
    console.error("exportGetDashboardData error:", err);
    return { success: false, message: err.message };
  }
}


