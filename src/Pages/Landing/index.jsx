import React from "react";
import './home.css'
import { Link } from "react-router";
import { Navbar } from "../../Components/Navbar";
import { Footer } from "../../Components/Footer";
import { About } from "../About";


// src/components/Hero.jsx

export function Landing() {

  const features = [
    {
      icon: '🔥',
      title: 'Accredited',
      text: 'Cost Effective and partnerships with world’s premier carriers, such USPS, EMS, DHL EXPRESS, FedEx Express as co-couriers.'
    },
    {
      icon: '🔒',
      title: 'Quality Service',
      text: 'Reliable CargoIQ certified, C-TPAT, PIP, and TAPA compliant. Split and full charters. On-time delivery.'
    },
    {
      icon: '⚙️',
      title: 'Trained Workers',
      text: 'Fast Delivery Services Building partnerships by serving customers’ needs with cost-effective, flexible options and on-time delivery.'
    },
    {
      icon: '🌐',
      title: 'Time Availability',
      text: 'Trans Logistics-ownes offices throughout the world – including high-growth emerging markets – guarantee we can support our customers, wherever you go and at any time.'
    },
    {
      icon: '📈',
      title: 'Friendly & Comprehensive Services',
      text: 'Friendly & Comprehensive Services Our friendly and dedicated account manager will meet you personally to discuss deeply regarding your needs. You can expect to have us take care of your goods from start to finish.'
    },
    {
      icon: '💡',
      title: 'First Class Personalized Solutions',
      text: 'Our air transport service gives you a tailored solution — everything is done according to your needs, and customers need to pay for only the services they require.'
    }
  ];

  return (
    <>
    <Navbar />

    <main className="page home-page">
<section className="hero">
<div>
<h1>Fast & Reliable Delivery</h1>
<p>Send packages anywhere, anytime — safely and quickly.</p>
<div className="hero-ctas">
<Link to="/request" className="btn primary">Request a Delivery</Link>
<Link to="/track" className="btn outline">Track My Package</Link>
<a className="btn ghost" href="https://wa.me/237000000000?text=Hello%2C%20I%20want%20to%20send%20a%20package" target="_blank" rel="noreferrer">WhatsApp Us</a>
</div>
</div>
<div className="hero-image">🚚</div>
</section>


<section className="how-it-works">
<h2>How it works</h2>
<div className="steps">
<div className="step">1. Request Pickup</div>
<div className="step">2. We Collect Your Package</div>
<div className="step">3. Fast & Safe Delivery</div>
</div>
</section>


<section className="quick-actions">
<Link to="/request" className="card">📤 Send a Package</Link>
<Link to="/tracking" className="card">🔎 Track Package</Link>
<Link to="/contact" className="card">💬 Contact Support</Link>
</section>


<section className="services">
<h2>Our Services</h2>
<div className="service-grid">
<div className="service">Express Delivery</div>
<div className="service">Document Delivery</div>
<div className="service">City-to-City</div>
<div className="service">Door-to-Door</div>
</div>
</section>
</main>

        <section className="hero">
        
        
      <div className="hero-overlay">
        <h1 className="hero-title">Logistics Services</h1>
        <Link to="/tracking" className="hero-button"> Track Shipment</Link>
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

    <section className="about">
      <div className="about-images">
        <img src="public\images\Couriel\1.jpg" alt="Delivery service 1" className="about-img top" />
        <img src="public\images\Couriel\2.png" alt="Delivery service 2" className="about-img bottom" />
      </div>

      <div className="about-content">
        <h2>Go Delivery Agency</h2>
        <p>
         Professional Logistics Contractors At Glo delivery agency, our main priority is clients satisfaction, as we strive to improve the quality of our services using new technologies and strategies to keep them ever happy. In a competitive world of logistics where customer satisfaction and safe delivery of parcels is the key, We have step up the game to our competitors with advance services and technologies to give you reasons why you have to choose us. we ship your goods and commodities worldwide with the utmost care, as your international freight forwarder, in a single, seamless transaction. We offer global logistics services for wide range of cargo, including livestock, oversize project cargo, full aircraft charters, and full ocean containers, to oversize project cargo, Trans Logistics is a freight forwarder who takes pride in solving the most complex challenges. Our streamlined, customer friendly process is the industry standard in coordinated operations.
        </p>
        <p>
          Our team of professionals works around the clock to make sure your items reach their destination
          on time, every time. Trust Go Delivery Agency — your reliable logistics partner.
        </p>
      </div>
    </section>

    <section className="image-section">
      <div className="image-grid">
        <div className="image-card">
          <img src="public\images\road-freight.jpg" alt="Image 1" />
          <h3>Land Freight</h3>
          <p>With the largest fleet of vans of any Shipping Company in Cameroon – and the world at large we can offer dedicated services all over Africa</p>
        </div>
        <div className="image-card">
          <img src="public\images\airfreight-2.jpg" alt="Image 2" />
          <h3>Air Freight</h3>
          <p>Trans Logistics, specializes in providing expert international air freight forwarding services to large and small companies. We are an integral part of our clients export departments….</p>
        </div>
        <div className="image-card">
          <img src="public\images\ware-1024x535-1.webp" alt="Image 3" />
          <h3>Warehousing</h3>
          <p>Customized warehousing solutions and strategically sited distribution centers boost your productivity and increase flexibility</p>
        </div>
      </div>

      <div className="section-text">
        <h2><b>We Also Offer</b></h2>
        <p>
          We Also Offer Additional Services We Also Offer We are fast, reliable, competent. If you’re looking forward to an affordable parcel deliveries but don’t want to be compromise on quality or reliability, look no further than Trans Logistics for all your shipment handles and services. Ware Housing Door To Door Delivey
        </p>

      </div>
    </section>

    <section className="feature-section">
      <h2 className="section-header">Six Reasons For People Choosing Us</h2>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div className="feature-box" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-text">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </>
    
  );
}






// export function Home() {
//     return (
//         <>
//             <Navbar />
//             <Footer />


            
//         </>
//     );
// }