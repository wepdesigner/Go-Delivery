import React from "react";
import './settings.css'
import { Link } from "react-router";


export function Settings(){

    return(

        <>

                        <div className="dashboard-page">
              <aside className="dashboard-sidebar">
                <h3>Admin Panel</h3>
                <ul>
                  <li><Link to="/dashboard" className="nav-button">Dashboard</Link></li>
                  <li><Link to="/adddelivery" className="nav-button">Add Delivery</Link></li>
                  <li><Link to="/clients" className="nav-button">Clients</Link></li>
                  <li><Link to="/trackingpage" className="nav-button">Track</Link></li>
                  <li><Link to="/settings" className="nav-button">Settings</Link></li>
                  <li><Link to="/agentregister" className="nav-button">AddAgent</Link></li>
                  <li><Link to="/agentfeedback" className="nav-button">Agents Feedback</Link></li>
                </ul>
              </aside>
              </div>

        </>
    );
}