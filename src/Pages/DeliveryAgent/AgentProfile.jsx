// import React, { useEffect, useState } from "react";
// import AgentNavbar from "./AgentNavbar";
// import "./Agent.css";

// export default function AgentProfile() {
//   const [agent, setAgent] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [message, setMessage] = useState("");

//   // Load agent data from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("loggedAgent");
//     if (stored) {
//       const parsed = JSON.parse(stored);
//       setAgent(parsed);
//       setForm(parsed);
//     }
//   }, []);

//   // Handle input updates
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle file upload (convert to Base64)
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm({ ...form, photo: reader.result }); // base64 image
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Save locally
//   const handleSave = () => {
//     try {
//       localStorage.setItem("loggedAgent", JSON.stringify(form));
//       localStorage.setItem("agentData", JSON.stringify(form));
//       setAgent(form);
//       setEditMode(false);
//       setMessage("✅ Profile updated successfully (saved locally)!");
//     } catch (err) {
//       console.error("Save failed:", err);
//       setMessage("⚠️ Failed to save profile.");
//     }
//   };

//   if (!agent) return <p className="loading">Loading profile...</p>;

//   return (
//     <div className="agent-profile-page">
//       <AgentNavbar />
//       <div className="profile-container">
//         <h2>Agent Profile</h2>
//         {message && <p className="profile-message">{message}</p>}

//         <div className="profile-card">
//           <div className="profile-photo">
//             <img
//               src={form.photo || "/default-avatar.png"}
//               alt="Agent"
//               className="agent-avatar"
//             />
//             {editMode && (
//               <>
//                 <label htmlFor="photoUpload" className="file-label">
//                   Choose a photo
//                 </label>
//                 <input
//                   id="photoUpload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//               </>
//             )}
//           </div>

//           <div className="profile-info">
//             <label>Full Name</label>
//             {editMode ? (
//               <input
//                 name="fullName"
//                 value={form.fullName || ""}
//                 onChange={handleChange}
//               />
//             ) : (
//               <p>{agent.fullName}</p>
//             )}

//             <label>Email</label>
//             <p>{agent.email}</p>

//             <label>Phone</label>
//             {editMode ? (
//               <input
//                 name="phone"
//                 value={form.phone || ""}
//                 onChange={handleChange}
//               />
//             ) : (
//               <p>{agent.phone}</p>
//             )}

//             <label>Password</label>
//             {editMode ? (
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password || ""}
//                 onChange={handleChange}
//               />
//             ) : (
//               <p>••••••••</p>
//             )}
//           </div>
//         </div>

//         <div className="profile-actions">
//           {editMode ? (
//             <>
//               <button className="btn save" onClick={handleSave}>
//                 Save Changes
//               </button>
//               <button className="btn cancel" onClick={() => setEditMode(false)}>
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button className="btn edit" onClick={() => setEditMode(true)}>
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import AgentNavbar from "./AgentNavbar";
import AgentSidebar from "./AgentSidebar";
import "./profile.css";

export default function AgentProfile() {
  const [agent, setAgent] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loggedAgent"));
    if (stored) setAgent(stored);
  }, []);

  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setAgent({ ...agent, photo: reader.result });
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem("loggedAgent", JSON.stringify(agent));
    const agents = JSON.parse(localStorage.getItem("agents")) || [];
    const updated = agents.map((a) =>
      a.email === agent.email ? agent : a
    );
    localStorage.setItem("agents", JSON.stringify(updated));
    setEdit(false);
  };

  return (
    <div className="agent-layout">
      <AgentSidebar />
      <div className="agent-main">
        <AgentNavbar />
        <div className="agent-page">
          <h2>👤 Agent Profile</h2>
          <div className="profile-card">
            <img
              src={agent.photo || "/default-avatar.png"}
              alt="Agent"
              className="profile-photo"
            />
            {edit && <input type="file" onChange={handlePhoto} />}
            <div className="profile-info">
              <label>Name:</label>
              {edit ? (
                <input name="fullName" value={agent.fullName || ""} onChange={handleChange} />
              ) : (
                <p>{agent.fullName}</p>
              )}

              <label>Email:</label>
              <p>{agent.email}</p>

              <label>Phone:</label>
              {edit ? (
                <input name="phone" value={agent.phone || ""} onChange={handleChange} />
              ) : (
                <p>{agent.phone}</p>
              )}
            </div>
            <div className="profile-actions">
              {edit ? (
                <>
                  <button onClick={saveProfile}>Save</button>
                  <button onClick={() => setEdit(false)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setEdit(true)}>Edit</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
