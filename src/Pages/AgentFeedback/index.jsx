
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./feedback.css";
import { Navbar2 } from "../../Components/Navbar2";

export function AgentFeedback() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [newFeedback, setNewFeedback] = useState("");

  // Load agents and feedbacks from localStorage
  useEffect(() => {
    const storedAgents = JSON.parse(localStorage.getItem("agents")) || [];
    const feedbackData = JSON.parse(localStorage.getItem("agentFeedbackData")) || {};

    // Merge feedback arrays into agents
    const mergedAgents = storedAgents.map((agent) => ({
      ...agent,
      feedbacks: feedbackData[agent.email] || [],
    }));
    setAgents(mergedAgents);
  }, []);

  // Save feedback to localStorage
  const handleAddFeedback = () => {
    if (!selectedAgent || !newFeedback.trim()) return;

    const date = new Date().toLocaleString();
    const updatedAgents = agents.map((agent) => {
      if (agent.email === selectedAgent.email) {
        const newEntry = { message: newFeedback.trim(), date };
        const updatedFeedbacks = [...(agent.feedbacks || []), newEntry];
        agent.feedbacks = updatedFeedbacks;

        // Persist feedback by agent email
        const storedFeedback = JSON.parse(localStorage.getItem("agentFeedbackData")) || {};
        storedFeedback[agent.email] = updatedFeedbacks;
        localStorage.setItem("agentFeedbackData", JSON.stringify(storedFeedback));
      }
      return agent;
    });

    setAgents(updatedAgents);
    setNewFeedback("");
  };

  return (
    <>
    <Navbar2/>
    <div className="dashboard-pages">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li><Link to="/dashboard" className="nav-button">Dashboard</Link></li>
          <li><Link to="/adddelivery" className="nav-button">Add Delivery</Link></li>
          <li><Link to="/clients" className="nav-button">Clients</Link></li>
          <li><Link to="/trackingpage" className="nav-button">Track</Link></li>
          <li><Link to="/agentregister" className="nav-button">Add Agents</Link></li>
          <li><Link to="/agentfeedback" className="nav-button active">Agent Feedback</Link></li>
        </ul>
      </aside>

      <div className="admin-feedback-page">
        <h2>📋 Delivery Agents Feedback Dashboard</h2>

        {agents.length === 0 ? (
          <p className="empty">No registered agents found.</p>
        ) : (
          <div className="agent-feedback-list">
            {agents.map((agent, index) => (
              <div
                className={`agent-card ${
                  selectedAgent?.email === agent.email ? "selected" : ""
                }`}
                key={index}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="agent-header">
                  <img
                    src={agent.photo || "/default-avatar.png"}
                    alt={agent.fullName}
                    className="agent-photo"
                  />
                  <div>
                    <h3>{agent.fullName}</h3>
                    <p>{agent.email}</p>
                    <p>{agent.phone}</p>
                  </div>
                </div>

                <div className="agent-body">
                  <strong>Feedback History:</strong>
                  {agent.feedbacks && agent.feedbacks.length > 0 ? (
                    <ul className="feedback-list">
                      {agent.feedbacks.map((fb, i) => (
                        <li key={i}>
                          <span>{fb.message}</span>
                          <em>{fb.date}</em>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-feedback">No feedback yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Input Section */}
        {selectedAgent && (
          <div className="feedback-form">
            <h3>Send Feedback to {selectedAgent.fullName}</h3>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Write feedback..."
            ></textarea>
            <button onClick={handleAddFeedback}>Submit Feedback</button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

