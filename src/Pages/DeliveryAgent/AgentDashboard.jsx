
import React, { useEffect, useState } from "react";
import AgentSidebar from "./AgentSidebar";
import AgentNavbar from "./AgentNavbar";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import "../DeliveryAgent/AgentDashboard.css";

export default function AgentDashboard() {
  const [agent, setAgent] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    pending: 0,
    cancelled: 0,
  });
  const [chartData, setChartData] = useState([]);

  // ✅ Load agent info and stats
  useEffect(() => {
    const loggedAgent = JSON.parse(localStorage.getItem("loggedAgent"));
    const agents = JSON.parse(localStorage.getItem("agents")) || [];
    const current = loggedAgent || agents[0];
    setAgent(current || null);
    loadStats(current);
  }, []);

  // ✅ Load all deliveries assigned to the agent
  const loadStats = (agent) => {
    if (!agent) return;
    const deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
    const myDeliveries = deliveries.filter(
      (d) =>
        d.assignedTo === agent.email ||
        d.assignedDelivery?.includes(agent.fullName)
    );

    const total = myDeliveries.length;
    const delivered = myDeliveries.filter((d) => d.status === "Delivered").length;
    const pending = myDeliveries.filter((d) => d.status === "Pending").length;
    const cancelled = myDeliveries.filter((d) => d.status === "Cancelled").length;

    setStats({ total, delivered, pending, cancelled });

    setChartData([
      { name: "Delivered", value: delivered },
      { name: "Pending", value: pending },
      { name: "Cancelled", value: cancelled },
    ]);
  };

  // ✅ Handle feedback submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage("⚠️ Please enter your feedback.");
      return;
    }

    const newFeedback = {
      status,
      message: feedback,
      date: new Date().toLocaleString(),
    };

    if (!agent || !agent.email) {
      setMessage("❌ Agent data not found.");
      return;
    }

    // Save in feedback storage
    const feedbackData = JSON.parse(localStorage.getItem("agentFeedbackData")) || {};
    const updatedFeedbacks = [...(feedbackData[agent.email] || []), newFeedback];
    feedbackData[agent.email] = updatedFeedbacks;
    localStorage.setItem("agentFeedbackData", JSON.stringify(feedbackData));

    // Update current agent
    const updatedAgent = {
      ...agent,
      taskFeedback: feedback,
      taskStatus: status,
      feedbackDate: newFeedback.date,
    };

    localStorage.setItem("agentFeedback", JSON.stringify(updatedAgent));
    localStorage.setItem("loggedAgent", JSON.stringify(updatedAgent));
    setAgent(updatedAgent);
    setFeedback("");
    setStatus("Pending");
    setMessage("✅ Feedback submitted successfully!");
  };

  if (!agent) {
    return <p className="loading">No agent data found. Please register first.</p>;
  }

  return (
    <div className="agent-dashboard">
      {/* <AgentNavbar /> */}
      <AgentSidebar />

      <div className="agent-main">
        

        <div className="agent-content">
          <h2>Welcome back, {agent.fullName || "Delivery Agent"} 👋</h2>

          {/* === Agent Stats === */}
          <div className="agent-summary">
            <div className="summary-card blue">
              <h4>Total Deliveries</h4>
              <p>{stats.total}</p>
            </div>
            <div className="summary-card green">
              <h4>Delivered</h4>
              <p>{stats.delivered}</p>
            </div>
            <div className="summary-card yellow">
              <h4>Pending</h4>
              <p>{stats.pending}</p>
            </div>
            <div className="summary-card red">
              <h4>Cancelled</h4>
              <p>{stats.cancelled}</p>
            </div>
          </div>

          {/* === Chart Section === */}
          <div className="chart-card">
            <h3>📊 Delivery Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#007bff" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* === Feedback Section === */}
          <div className="feedback-section">
            <h3>📝 Submit Task Feedback</h3>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <label>Feedback</label>
              <textarea
                rows="4"
                value={feedback}
                placeholder="Write feedback about your task..."
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>

              <button type="submit" className="btn-submit">
                Submit Feedback
              </button>
            </form>

            {message && <p className="feedback-msg">{message}</p>}
          </div>

          {/* === Last Feedback === */}
          {agent.taskFeedback && (
            <div className="previous-feedback-card">
              <h4>📜 Previous Feedback</h4>
              <p><strong>Status:</strong> {agent.taskStatus}</p>
              <p><strong>Feedback:</strong> {agent.taskFeedback}</p>
              <p><em>Submitted on {agent.feedbackDate}</em></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


