import React from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { Router } from './Router';
import { Home } from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Service } from './Pages/Service';
import { Tracking } from './Pages/Tracking';
import { Register } from './Components/Register';
import { Login } from './Components/Login';
import { Read } from './Components/Read';
import { Dashboard } from './Pages/Dashboard';
import { AddDelivery } from './Pages/AddDelivery';
import { TrackingPage } from './Pages/TrackingPage';
import { Clients } from './Pages/Clients';
import { Settings } from './Pages/Settings';
import { DeliveryAgent } from './Pages/DeliveryAgent';
import { AgentRegister } from './AgentRegister/agentRegister';
// import { AgentDashboard } from './Pages/DeliveryAgent/AgentDashboard';
// import AgentLogin from "./Pages/DeliveryAgent";
import AgentDashboard from "./Pages/DeliveryAgent/AgentDashboard";
import AgentNavbar from './Pages/DeliveryAgent/AgentNavbar';
import AgentProfile from './Pages/DeliveryAgent/AgentProfile';
import { AgentFeedback } from './Pages/AgentFeedback';
import AdminLogin from './Pages/Dashboard/AdminLogin';
import Update from './Pages/DeliveryAgent/Update';
import Assigned from './Pages/DeliveryAgent/Assigned';
import Report from './Pages/DeliveryAgent/Report';
import { Landing } from './Pages/Landing';
import HeroSection from './Pages/Home/HeroSection';
import Request from './Pages/Landing/Request';
import UserDashboard from './Pages/Landing/userdashboard';
import IncomingRequests from './Pages/Dashboard/IncomingRequests';


function App(){
  return (

    // <Router/>


    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>} />
          {/* <Route path='/landing' element={<Landing/>} /> */}
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/service' element={<Service/>} />
          <Route path='/tracking' element={<Tracking/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/read' element={<Read/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/adddelivery' element={<AddDelivery/>} />
          <Route path='/agentfeedback' element={<AgentFeedback/>} />
          <Route path='/trackingpage' element={<TrackingPage/>} />
          <Route path='/clients' element={<Clients/>} />
          <Route path='/settings' element={<Settings/>} />
          <Route path='/deliveryagent' element={<DeliveryAgent/>} />
          <Route path='/agentregister' element={<AgentRegister/>} />
          <Route path='/agentdashboard' element={<AgentDashboard/>} />
          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path='/deliveryagent/report' element={<Report/>} />
          <Route path="/deliveryagent/agentdashboard" element={<AgentDashboard  />} />
          <Route path="/deliveryagent/agentnavbar" element={<AgentNavbar  />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/deliveryagent/assigned" element={<Assigned />} />
          <Route path="/deliveryagent/update" element={<Update />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/herosection" element={<HeroSection />} />
          <Route path="/request" element={<Request />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/incomingrequests" element={<IncomingRequests />} />

          <Route path="/deliveryagent/agentprofile" element={<AgentProfile />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
