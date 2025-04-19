import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import FeaturesSection from "../../components/Features/FeaturesSection";
import TestimonialsCarousel from "../../components/TestimonialsCarousel/TestimonialsCarousel"; 
import "./Home.css"; 

function Home() {
  const navigate = useNavigate();

  // State for modals
  const [showModal, setShowModal] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Data for testimonials
  const testimonialsData = [
    { name: "Jet R.", text: "This program changed my life!" },
    { name: "Ja'Quan B.", text: "An amazing experience, highly recommend." },
    { name: "Faust B.", text: "I learned so much and landed a job quickly!" },
    { name: "Amanda D.", text: "Typing weird stuff untill it works-that's the magic of coding!!" },
  ];

  const handleTestimonials = () => {
    setShowTestimonials(true);
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      {/* <nav className="navbar">
        <ul>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
          <li>
            <Link to="/career-maps">Career Maps</Link>
          </li>
          <li className="login-nav">
            <button className="login-button" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          </li>
          <li className="register-nav">
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </li>
        </ul>
      </nav> */}

      {/* Common Components */}
      <Header />
      <Hero />
      <FeaturesSection />

      {/* Features Buttons */}
      <div className="features-buttons">
        <button className="accent-button" onClick={() => setShowModal(true)}>
          Start Your Journey
        </button>
        <button className="accent-button">
          Meet Our Mentors
        </button>
        <button className="accent-button" onClick={handleTestimonials}>
          Testimonials
        </button>
      </div>

      {/* Experience Modal Pop-out */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Your Current Experience?</h2>
            <ul>
              <li>
                <button onClick={() => { setShowModal(false); navigate("/questionnaire", { state: { experience: "None" } }); }}>
                  None
                </button>
              </li>
              <li>
                <button onClick={() => { setShowModal(false); navigate("/questionnaire", { state: { experience: "Some" } }); }}>
                  Some
                </button>
              </li>
              <li>
                <button onClick={() => { setShowModal(false); navigate("/questionnaire", { state: { experience: "A Lot" } }); }}>
                  A Lot
                </button>
              </li>
            </ul>
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Testimonials Carousel instead of Modal */}
      {showTestimonials && (
        <TestimonialsCarousel
          testimonials={testimonialsData}
          onClose={() => setShowTestimonials(false)}
        />
      )}

      {/* Login Modal Pop-out */}
      {showLoginModal && (
        <div className="modal-overlay login-overlay">
          <div className="modal login-modal">
            <h2>Login</h2>
            {/* Login form goes here */}
            <button className="close-button" onClick={() => setShowLoginModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
