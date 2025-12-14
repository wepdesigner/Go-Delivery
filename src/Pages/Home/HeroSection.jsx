import { Link } from "lucide-react";
import React from "react";
// import "../../Styles/globals.css";
// import Navbar from "../../Components/Navbar/Navbar";
import "./style.css"

export default function HeroSection() {
  return (
    <>
    <div className="logo">
              <img src="../../../public/images/deliver.png" alt="" />
            </div>
    {/* <Navbar/> */}
        <header className="hero">
      
      <div className="hero-content">
        <h1>Fast & Reliable Delivery, Anytime, Anywhere.</h1>
        <p>Track, manage, and deliver with ease using DeliverEase.</p>
        <button className="hero-btn"><a href="/login">Get Sarted</a></button>
       
      </div>
    </header>
    </>
  );
}
