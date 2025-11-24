import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import RecentDeliveries from "../RecentDeliveries";
import { Link } from "react-router-dom";
import { Navbar2 } from "../../Components/Navbar2";
import * as XLSX from "xlsx";
import IncomingRequests from "./IncomingRequests";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalDeliveries: 0,
    pending: 0,
    delivered: 0,
    cancelled: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [refreshTime, setRefreshTime] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/adminlogin";
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");

    // === Stats ===
    const totalDeliveries = deliveries.length;
    const totalClients = new Set(deliveries.map((d) => d.fullName)).size;
    const pending = deliveries.filter((d) => d.status === "Pending").length;
    const delivered = deliveries.filter(
      (d) => d.status === "Deliver" || d.status === "Delivered"
    ).length;
    const cancelled = deliveries.filter(
      (d) => d.status === "Cancel" || d.status === "Cancelled"
    ).length;

    setStats({
      totalClients,
      totalDeliveries,
      pending,
      delivered,
      cancelled,
    });

    // === Monthly Chart Data ===
    const monthlyData = {};
    deliveries.forEach((d) => {
      const dateStr = d.expeditionDate || d.deliveryDate;
      if (!dateStr) return;

      const date = new Date(dateStr);
      const month = date.toLocaleString("default", { month: "short" });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          deliveries: 0,
          pending: 0,
          delivered: 0,
          cancelled: 0,
        };
      }

      monthlyData[month].deliveries += 1;
      if (d.status === "Pending") monthlyData[month].pending += 1;
      if (d.status === "Deliver" || d.status === "Delivered")
        monthlyData[month].delivered += 1;
      if (d.status === "Cancel" || d.status === "Cancelled")
        monthlyData[month].cancelled += 1;
    });

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formatted = monthOrder
      .filter((m) => monthlyData[m])
      .map((m) => monthlyData[m]);

    setChartData(formatted);
    setRefreshTime(new Date().toLocaleTimeString());
  };

  // === Export Monthly Report ===
  const exportMonthlyReport = () => {
    const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter deliveries for the current month
    const monthlyDeliveries = deliveries.filter((d) => {
      const dateStr = d.deliveryDate || d.expeditionDate;
      if (!dateStr) return false;
      const date = new Date(dateStr);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // Group by agent
    const agentMap = {};
    monthlyDeliveries.forEach((d) => {
      const agentName = d.assignedToName || d.assignedDelivery || "Unassigned";
      if (!agentMap[agentName]) agentMap[agentName] = [];
      agentMap[agentName].push(d);
    });

    // Prepare data for Excel
    const reportData = [];
    Object.keys(agentMap).forEach((agent) => {
      agentMap[agent].forEach((d) => {
        reportData.push({
          Agent: agent,
          "Client Name": d.fullName,
          "Tracking Number": d.trackingNumber,
          Status: d.status,
          "Delivery Date": d.deliveryDate || "",
          "Goods Delivered": d.goods || d.description || "",
        });
      });
    });

    // Create Excel sheet
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Report");

    // Save file
    const monthName = now.toLocaleString("default", { month: "long" });
    XLSX.writeFile(workbook, `Agent_Monthly_Report_${monthName}_${currentYear}.xlsx`);
  };

  return (
    <>
      <Navbar2 />
      <div className="dashboard-page">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <h3>Admin Panel</h3>
          <ul>
            <li>
              <Link to="/dashboard" className="nav-button active">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/adddelivery" className="nav-button">
                Add Delivery
              </Link>
            </li>
            <li>
              <Link to="/clients" className="nav-button">
                Clients
              </Link>
            </li>
            <li>
              <Link to="/trackingpage" className="nav-button">
                Track
              </Link>
            </li>
            <li>
              <Link to="/agentregister" className="nav-button">
                AddAgent
              </Link>
            </li>
            <li>
              <Link to="/agentfeedback" className="nav-button">
                Agents Feedback
              </Link>
            </li>
            <li>
              <Link to="/incomingrequests" className="nav-button">
                Requests
              </Link>
            </li>
          </ul>
        </aside>

        {/* <section className="admin-incoming-section">
  <IncomingRequests onSelectRequest={(req) => {
    // Optionally highlight or scroll to a delivery card
    alert(`New request selected: ${req.tracking}`);
  }} />
</section> */}

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <header className="dashboard-top">
            <div>
              <h1>📊 Delivery System Dashboard</h1>
              <p>Track performance, deliveries, and monthly analytics</p>
            </div>
            <div className="refresh-box">
              <button className="refresh-btn" onClick={loadDashboardData}>
                🔄 Refresh Dashboard
              </button>
              {refreshTime && (
                <small className="refresh-time">Last updated: {refreshTime}</small>
              )}
            </div>
          </header>

          {/* === Report Button === */}
          <div className="report-button-container">
            <button className="btn-report" onClick={exportMonthlyReport}>
              📥 Download Monthly Report
            </button>
          </div>

          {/* === Stats Section === */}
          <section className="stats-cards">
            <div className="card total">
              <h4>Total Clients</h4>
              <p>{stats.totalClients}</p>
            </div>
            <div className="card blue">
              <h4>Total Deliveries</h4>
              <p>{stats.totalDeliveries}</p>
            </div>
            <div className="card yellow">
              <h4>Pending</h4>
              <p>{stats.pending}</p>
            </div>
            <div className="card green">
              <h4>Delivered</h4>
              <p>{stats.delivered}</p>
            </div>
            <div className="card red">
              <h4>Cancelled</h4>
              <p>{stats.cancelled}</p>
            </div>
          </section>

          {/* === Charts Section === */}
          <section className="charts-grid">
            <div className="chart-card">
              <h3>📈 Deliveries Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="deliveries"
                    stroke="#007bff"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>📊 Status Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pending" stackId="a" fill="#ffc107" />
                  <Bar dataKey="delivered" stackId="a" fill="#28a745" />
                  <Bar dataKey="cancelled" stackId="a" fill="#dc3545" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* === Recent Deliveries === */}
          <RecentDeliveries key={refreshTime} />
        </main>
      </div>
    </>
  );
}
