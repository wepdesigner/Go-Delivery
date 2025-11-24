import React, { useState } from "react";
import { Navbar } from "../../Components/Navbar";
import './index.css'
import { Footer } from "../../Components/Footer";

export function Service(){

    const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Delivery Scheduled:', formData);
    alert('Delivery Scheduled Successfully!');
    // You can add API calls here
    setFormData({ fullName: '', phone: '' });
  };


    return(
        <> 
        <Navbar />

                    <section className="hero">
        
        
      <div className="hero-overlay">
        <h1 className="hero-title">Our Services</h1>
      </div>
      <div className="hero-images">
        <div className="scrolling-images">
          <img src="public\images\road-freight.jpg" alt="Background 1" />
          <img src="public\images\airfreight-2.jpg" alt="Background 2" />
          <img src="public\images\ware-1024x535-1.webp" alt="Background 3" />
          {/* Repeating for infinite scroll effect */}
          <img src="public\images\road-freight.jpg" alt="Background 1 duplicate" />
          <img src="public\images\airfreight-2.jpg" alt="Background 2 duplicate" />
          <img src="public\images\ware-1024x535-1.webp" alt="Background 3 duplicate" />
        </div>
      </div>
    </section>

        <section className="image-section">
      <div className="image-grid">
        <div className="image-card">
          <img src="src\assets\road-freight.jpg" alt="Image 1" />
          <h3>Land Freight</h3>
          <p>With the largest fleet of vans of any Shipping Company in Cameroon – and the world at large we can offer dedicated services all over Africa</p>
        </div>
        <div className="image-card">
          <img src="src\assets\airfreight-2.jpg" alt="Image 2" />
          <h3>Air Freight</h3>
          <p>Trans Logistics, specializes in providing expert international air freight forwarding services to large and small companies. We are an integral part of our clients export departments….</p>
        </div>
        <div className="image-card">
          <img src="src\assets\ware-1024x535-1.webp" alt="Image 3" />
          <h3>Warehousing</h3>
          <p>Customized warehousing solutions and strategically sited distribution centers boost your productivity and increase flexibility</p>
        </div>

                <div className="image-card">
          <img src="src\assets\service\ocean.jpg" alt="Image 3" />
          <h3>Ocean Freight</h3>
          <p>Glo Delivery Agency in providing expert international ocean freight forwarding services to companies large and small. We are an integral part…. Our Supply Chain Suite is effectively integrated and highly scalable with easy-to-use supply chain modules consisting of Container Freight Station, Trading Partner, Warehousing, Distribution, Customer Relationship Management, Transportation and Freight Management.</p>
        </div>

                <div className="image-card">
          <img src="src\assets\service\distribution.jpg" alt="Image 3" />
          <h3>Distribution</h3>
          <p>Glo Delivery Agency also offers customs brokerage services at every major entry point throughout Malaysia, including Port Klang, Penang, Ipoh, Johor, KLIA and Penang Airport. This service allows a “One-Stop Solution” of freight established to assist transportation problems. We also have trained employees and an internal system that enables all custom clearance process to be done quickly</p>
        </div>

                <div className="image-card">
          <img src="src\assets\service\network.jpg" alt="Image 3" />
          <h3>Creating Value Across Collaborative Trade Networks</h3>
          <p>Glo Delivery Agency we assure you on-time shipments. Tapping on our extensive global freight forwarding network alliances, we provide outstanding service lanes and connectivity to major gateways. Our valuable customers enjoy total peace of mind knowing that our expert level Clearance Officers are well equipped with sound local customs regulations know-how for clearances at all major shipping gateways.</p>
        </div>
      </div>
    </section>

    <section className="schedule-delivery-section">
      <div className="schedule-delivery-overlay">
        <div className="schedule-delivery-box">
          <h2>Schedule a Delivery</h2>
          <p>With this, we provide real-time visibility of our operations to our valued customers by integrating all the core logistics, fulfillment centres and warehouse management functions. As a result, customer supply chains and warehouse processes are fully optimized for consistent and flawless order fulfillment and maximum customer satisfaction.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>

        <Footer/>
        </>
    );
}