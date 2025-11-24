import React from "react";
import "./css/Report.css";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminTopbar from "../../components/Admin/AdminTopbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 2800 },
];

const Reports = () => {
  const exportReport = () => {
    const csv = data.map(d => `${d.month},${d.revenue}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <div className="reports">
          <h2>Reports Generator</h2>
          <button onClick={exportReport}>Export CSV</button>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
