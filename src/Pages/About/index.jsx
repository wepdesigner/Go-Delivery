import React from "react"
// import './index.css'
import { Navbar } from "../../Components/Navbar";
import './about.css'
import { Footer } from "../../Components/Footer";
import { Link } from "react-router";

export function About(){


      const features = [
    {
      icon: '🔥',
      title: 'Accredited Company',
      text: 'First Class Personalized Solutions​Our air transport service gives you a tailored solution — everything is done according to your needs, and customers need to pay for only the services they require.​We will work with you to learn more about your business and operations as we proceed to ensure the type of solution that suits you.'
    },
    {
      icon: '🔒',
      title: 'Friendly & Comprehensive Services',
      text: 'Our friendly and dedicated account manager will meet you personally to discuss deeply regarding your needs. You can expect to have us take care of your goods from start to finish. Our freight services are comprehensive, which include sea, overland transportation and any warehousing you require..'
    },
    {
      icon: '⚙️',
      title: 'We Offer You Precise, Secure and Timely Shipping',
      text: 'You will also be assured of timely and guaranteed delivery. We promise you a delivery solution that you no longer need to worry about. Wish to find out how our professional and dedicated team can help you? Please contact us for an obligation-free consultation or a quote.'
    },

  ];

    return (
        <>
            <Navbar />

            <section className="hero">
        
        
      <div className="hero-overlay">
        <h1 className="hero-title">About Us</h1>
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

            <section className="unique-image-section">
                <div className="image-wrapper">
                    <img
                    src="public\images\about\1.jpg" 
                    alt="Unique display"
                    className="responsive-image"
                    />
                </div>
            </section>
            <section className="about">

      <div className="about-content">
        <h2>About Company</h2>
        <p>
        About Company Glo Delivery Agency is committed to assisting manufacturers and brands to streamline and improve their logistics operations by delivering high quality customer service.Our team has the capability and experience to offer the quickest and most cost effective logistics solutions to our valued customers through innovative technology and services.
        </p>
        <Link to="/read" className="hero-button"> Read More</Link>
      </div>

      <div className="about-content">
        <p>
         We provide you with a comprehensive supply chain management service by upgrading the effectiveness of your current logistics. Next, we keep your overall cost down by managing the entire process from start to finish, so you can focus on your core business.

        Our solutions are tailored made, which enables us to offer reliable and efficient freight services through an extensive global network.

        We aspire to be part of global commerce, assisting brands and businesses to store, manage, protect and deliver goods directly to their  customers.
        </p>
      </div>
    </section>

        <section className="feature-section">
      <h2 className="section-header"> Reasons For Choosing Us</h2>
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