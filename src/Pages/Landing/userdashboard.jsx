// import React, { useEffect, useState, useRef } from "react";
// import { jsPDF } from "jspdf";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import { Home, Truck, Send, FileDown, XCircle, User, Camera } from "lucide-react";
// import "leaflet/dist/leaflet.css";
// import { Navbar } from "../../Components/Navbar";
// import './user.css'

// // Fix leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({});

// export default function UserDashboard() {
//   const [requests, setRequests] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [profile, setProfile] = useState({ name: "", phone: "", avatar: null });
//   const locationIntervalRef = useRef(null);
//   const [livePosition, setLivePosition] = useState(null);

//   useEffect(() => {
//     setRequests(JSON.parse(localStorage.getItem("deliveries") || "[]"));
//     const p = JSON.parse(localStorage.getItem("userProfile") || "null");
//     if (p) setProfile(p);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
//     };
//   }, []);

//   const saveRequests = (updated) => {
//     setRequests(updated);
//     localStorage.setItem("deliveries", JSON.stringify(updated));
//   };

//   const cancelRequest = (id) => {
//     const updated = requests.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r));
//     saveRequests(updated);
//     if (selected && selected.id === id) setSelected({ ...selected, status: "Cancelled" });
//     pushNotification("Request cancelled", `Request ${id} was cancelled.`);
//   };

//   const downloadReceipt = (req) => {
//     const pdf = new jsPDF();
//     pdf.text(`Delivery Receipt`, 20, 20);
//     pdf.text(`Tracking: ${req.tracking}`, 20, 30);
//     pdf.text(`Name: ${req.fullName}`, 20, 40);
//     pdf.text(`Phone: ${req.phone}`, 20, 50);
//     pdf.text(`Pickup: ${req.pickup}`, 20, 60);
//     pdf.text(`Delivery: ${req.delivery}`, 20, 70);
//     pdf.text(`Status: ${req.status}`, 20, 80);
//     pdf.save(`receipt-${req.tracking}.pdf`);
//     pushNotification("Receipt downloaded", `Receipt for ${req.tracking} downloaded.`);
//   };

//   const statusColor = (status) => {
//     switch (status) {
//       case "Pending": return "badge pending";
//       case "Delivered": return "badge delivered";
//       case "Cancelled": return "badge cancelled";
//       case "In Transit": return "badge transit";
//       default: return "badge";
//     }
//   };

//   const pushNotification = (title, text) => {
//     const n = { id: Date.now(), title, text, time: new Date().toLocaleTimeString() };
//     setNotifications((s) => [n, ...s].slice(0, 6));
//   };

//   // Live tracking simulation
//   const startLiveTracking = (req) => {
//     if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
//     setLivePosition(null);

//     const start = req.meta?.pickupCoords || randomCoordNearCenter();
//     const end = req.meta?.deliveryCoords || randomCoordNearCenter();
//     const steps = 20;
//     let step = 0;

//     const interval = setInterval(() => {
//       step++;
//       const lat = start.lat + ((end.lat - start.lat) * step) / steps;
//       const lng = start.lng + ((end.lng - start.lng) * step) / steps;
//       setLivePosition({ lat, lng });

//       if (step === Math.floor(steps / 2)) {
//         updateRequestStatus(req.id, "In Transit");
//         pushNotification("In Transit", `Package ${req.tracking} is in transit.`);
//       }
//       if (step >= steps) {
//         updateRequestStatus(req.id, "Delivered");
//         pushNotification("Delivered", `Package ${req.tracking} has been delivered.`);
//         clearInterval(interval);
//         locationIntervalRef.current = null;
//       }
//     }, 1500);

//     locationIntervalRef.current = interval;
//   };

//   const randomCoordNearCenter = () => {
//     const baseLat = 4.05;
//     const baseLng = 9.7;
//     const offset = () => (Math.random() - 0.5) * 0.1;
//     return { lat: baseLat + offset(), lng: baseLng + offset() };
//   };

//   const updateRequestStatus = (id, status) => {
//     const updated = requests.map((r) => (r.id === id ? { ...r, status } : r));
//     saveRequests(updated);
//     if (selected && selected.id === id) setSelected({ ...selected, status });
//   };

//   const handleSelect = (req) => {
//     setSelected(req);
//     startLiveTracking(req);
//   };

//   // Profile handlers including avatar
//   const saveProfile = (p) => {
//     setProfile(p);
//     localStorage.setItem("userProfile", JSON.stringify(p));
//     pushNotification("Profile updated", "Your profile was saved.");
//   };

//   const handleAvatarUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => saveProfile({ ...profile, avatar: reader.result });
//     reader.readAsDataURL(file);
//   };

//   return (
//     <main className="user-dashboard page">
//       <Navbar />
//       <div className="dashboard-top">
//         <h2>Your Delivery Requests</h2>
//         <div className="profile-box">
//           <h4>Profile</h4>
//           <div className="avatar-preview">
//             {profile.avatar ? <img src={profile.avatar} alt="avatar"/> : <div className="placeholder"><Camera size={24}/></div>}
//           </div>
//           <input type="file" accept="image/*" onChange={handleAvatarUpload}/>
//           <ProfileEditor profile={profile} onSave={saveProfile}/>
//         </div>
//       </div>

//       {requests.length === 0 && <p>You haven't made any requests yet.</p>}

//       <div className="dashboard-body">
//         {/* Requests List */}
//         <div className="request-list">
//           {requests.map((req) => (
//             <div
//               key={req.id}
//               className={`req-card ${selected?.id === req.id ? "active" : ""}`}
//               onClick={() => handleSelect(req)}
//             >
//               <div className="req-top">
//                 <h4>{req.tracking}</h4>
//                 <span className={statusColor(req.status)}>{req.status}</span>
//               </div>
//               <p className="small"><strong>From:</strong> {req.pickup}</p>
//               <p className="small"><strong>To:</strong> {req.delivery}</p>
//             </div>
//           ))}
//         </div>

//         {/* Request Details */}
//         {selected && (
//           <aside className="details-panel animate-in">
//             <h3>Request Details</h3>
//             <p><strong>Tracking:</strong> {selected.tracking}</p>
//             <p><strong>Name:</strong> {selected.fullName}</p>
//             <p><strong>Phone:</strong> {selected.phone}</p>
//             <p><strong>Pickup:</strong> {selected.pickup}</p>
//             <p><strong>Delivery:</strong> {selected.delivery}</p>
//             <p><strong>Description:</strong> {selected.description || "N/A"}</p>
//             <p><strong>Weight:</strong> {selected.weight || "N/A"} kg</p>
//             <p><strong>Urgency:</strong> {selected.urgency}</p>
//             <p><strong>Status:</strong> <span className={statusColor(selected.status)}>{selected.status}</span></p>
//             <p><strong>Created At:</strong> {new Date(selected.createdAt).toLocaleString()}</p>

//             <div className="map-wrap">
//               {livePosition ? (
//                 <MapContainer center={[livePosition.lat, livePosition.lng]} zoom={13} style={{ height: 260, width: '100%' }}>
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={[livePosition.lat, livePosition.lng]}>
//                     <Popup>{`Live location for ${selected.tracking}`}</Popup>
//                   </Marker>
//                 </MapContainer>
//               ) : (
//                 <div className="map-placeholder">Live tracking not started yet. Click a request to start.</div>
//               )}
//             </div>

//             <div className="actions">
//               {selected.status === "Pending" && (
//                 <button className="btn danger" onClick={() => cancelRequest(selected.id)}>
//                   <XCircle size={14}/> Cancel Request
//                 </button>
//               )}
//               <button className="btn" onClick={() => downloadReceipt(selected)}>
//                 <FileDown size={14}/> Download Receipt
//               </button>
//             </div>
//           </aside>
//         )}

//         {/* Notifications Panel */}
//         <div className="notif-panel">
//           <h4>Notifications</h4>
//           {notifications.length === 0 && <p>No notifications yet.</p>}
//           {notifications.map((n) => (
//             <div key={n.id} className="notif">
//               <strong>{n.title}</strong> — <span className="time">{n.time}</span>
//               <div className="msg">{n.text}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// /* Profile Editor */
// function ProfileEditor({ profile, onSave }) {
//   const [form, setForm] = useState(profile || { name: '', phone: '' });
//   useEffect(() => setForm(profile || { name: '', phone: '' }), [profile]);
//   const submit = (e) => { e.preventDefault(); onSave(form); };
//   return (
//     <form className="profile-form" onSubmit={submit}>
//       <label>Name</label>
//       <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//       <label>Phone</label>
//       <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//       <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//         <button className="btn" type="submit">Save</button>
//       </div>
//     </form>
//   );
// }



import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Home, Truck, Send, FileDown, XCircle, User, Camera } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { Navbar } from "../../Components/Navbar";
import './user.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({});

export default function UserDashboard() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({ name: "", phone: "", avatar: null });
  const locationIntervalRef = useRef(null);
  const [livePosition, setLivePosition] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("deliveries") || "[]");
    setRequests(data);
    const p = JSON.parse(localStorage.getItem("userProfile") || "null");
    if (p) setProfile(p);
  }, []);

  useEffect(() => {
    return () => {
      if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    };
  }, []);

  const saveRequests = (updated) => {
    setRequests(updated);
    localStorage.setItem("deliveries", JSON.stringify(updated));
  };

  const cancelRequest = (id) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r));
    saveRequests(updated);
    if (selected && selected.id === id) setSelected({ ...selected, status: "Cancelled" });
    pushNotification("Request cancelled", `Request ${id} was cancelled.`);
  };

  const downloadReceipt = (req) => {
    const pdf = new jsPDF();
    pdf.text(`Delivery Receipt`, 20, 20);
    pdf.text(`Tracking: ${req.tracking}`, 20, 30);
    pdf.text(`Name: ${req.fullName}`, 20, 40);
    pdf.text(`Phone: ${req.phone}`, 20, 50);
    pdf.text(`Pickup: ${req.pickup}`, 20, 60);
    pdf.text(`Delivery: ${req.delivery}`, 20, 70);
    pdf.text(`Status: ${req.status}`, 20, 80);
    pdf.save(`receipt-${req.tracking}.pdf`);
    pushNotification("Receipt downloaded", `Receipt for ${req.tracking} downloaded.`);
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending": return "badge pending";
      case "Delivered": return "badge delivered";
      case "Cancelled": return "badge cancelled";
      case "In Transit": return "badge transit";
      default: return "badge";
    }
  };

  const pushNotification = (title, text) => {
    const n = { id: Date.now(), title, text, time: new Date().toLocaleTimeString() };
    setNotifications((s) => [n, ...s].slice(0, 6));
  };

  const updateRequestStatus = (id, status) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status } : r));
    saveRequests(updated);
    if (selected && selected.id === id) setSelected({ ...selected, status });
  };

  const handleSelect = (req) => {
    setSelected(req);
    startLiveTracking(req);
  };

  const startLiveTracking = (req) => {
    if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    setLivePosition(null);

    const start = req.meta?.pickupCoords || randomCoordNearCenter();
    const end = req.meta?.deliveryCoords || randomCoordNearCenter();
    const steps = 20;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const lat = start.lat + ((end.lat - start.lat) * step) / steps;
      const lng = start.lng + ((end.lng - start.lng) * step) / steps;
      setLivePosition({ lat, lng });

      if (step === Math.floor(steps / 2)) {
        updateRequestStatus(req.id, "In Transit");
        pushNotification("In Transit", `Package ${req.tracking} is in transit.`);
      }
      if (step >= steps) {
        updateRequestStatus(req.id, "Delivered");
        pushNotification("Delivered", `Package ${req.tracking} has been delivered.`);
        clearInterval(interval);
        locationIntervalRef.current = null;
      }
    }, 1500);

    locationIntervalRef.current = interval;
  };

  const randomCoordNearCenter = () => {
    const baseLat = 4.05;
    const baseLng = 9.7;
    const offset = () => (Math.random() - 0.5) * 0.1;
    return { lat: baseLat + offset(), lng: baseLng + offset() };
  };

  const saveProfile = (p) => {
    setProfile(p);
    localStorage.setItem("userProfile", JSON.stringify(p));
    pushNotification("Profile updated", "Your profile was saved.");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => saveProfile({ ...profile, avatar: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <main className="user-dashboard page">
      <Navbar />
      <div className="dashboard-top">
        <h2>Your Delivery Requests</h2>
        <div className="profile-box">
          <h4>Profile</h4>
          <div className="avatar-preview">
            {profile.avatar ? <img src={profile.avatar} alt="avatar"/> : <div className="placeholder"><Camera size={24}/></div>}
          </div>
          <input type="file" accept="image/*" onChange={handleAvatarUpload}/>
          <ProfileEditor profile={profile} onSave={saveProfile}/>
        </div>
      </div>

      {requests.length === 0 && <p>You haven't made any requests yet.</p>}

      <div className="dashboard-body">
        <div className="request-list">
          {requests.map((req) => (
            <div
              key={req.id}
              className={`req-card ${selected?.id === req.id ? "active" : ""}`}
              onClick={() => handleSelect(req)}
            >
              <div className="req-top">
                <h4>{req.tracking}</h4>
                <span className={statusColor(req.status)}>{req.status}</span>
              </div>
              <p className="small"><strong>From:</strong> {req.pickup}</p>
              <p className="small"><strong>To:</strong> {req.delivery}</p>
            </div>
          ))}
        </div>

        {selected && (
          <aside className="details-panel animate-in">
            <h3>Request Details</h3>
            <p><strong>Tracking:</strong> {selected.tracking}</p>
            <p><strong>Name:</strong> {selected.fullName}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Pickup:</strong> {selected.pickup}</p>
            <p><strong>Delivery:</strong> {selected.delivery}</p>
            <p><strong>Description:</strong> {selected.description || "N/A"}</p>
            <p><strong>Weight:</strong> {selected.weight || "N/A"} kg</p>
            <p><strong>Urgency:</strong> {selected.urgency}</p>
            <p><strong>Status:</strong> <span className={statusColor(selected.status)}>{selected.status}</span></p>
            <p><strong>Created At:</strong> {new Date(selected.createdAt).toLocaleString()}</p>

            <div className="map-wrap">
              {livePosition ? (
                <MapContainer center={[livePosition.lat, livePosition.lng]} zoom={13} style={{ height: 260, width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[livePosition.lat, livePosition.lng]}>
                    <Popup>{`Live location for ${selected.tracking}`}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="map-placeholder">Live tracking not started yet. Click a request to start.</div>
              )}
            </div>

            <div className="actions">
              {selected.status === "Pending" && (
                <button className="btn danger" onClick={() => cancelRequest(selected.id)}>
                  <XCircle size={14}/> Cancel Request
                </button>
              )}
              <button className="btn" onClick={() => downloadReceipt(selected)}>
                <FileDown size={14}/> Download Receipt
              </button>
            </div>
          </aside>
        )}

        <div className="notif-panel">
          <h4>Notifications</h4>
          {notifications.length === 0 && <p>No notifications yet.</p>}
          {notifications.map((n) => (
            <div key={n.id} className="notif">
              <strong>{n.title}</strong> — <span className="time">{n.time}</span>
              <div className="msg">{n.text}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ProfileEditor({ profile, onSave }) {
  const [form, setForm] = useState(profile || { name: '', phone: '' });
  useEffect(() => setForm(profile || { name: '', phone: '' }), [profile]);
  const submit = (e) => { e.preventDefault(); onSave(form); };
  return (
    <form className="profile-form" onSubmit={submit}>
      <label>Name</label>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label>Phone</label>
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="btn" type="submit">Save</button>
      </div>
    </form>
  );
}
