import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import FeaturesSection from "../../components/Features/FeaturesSection";
// import TestimonialsCarousel from "../../components/TestimonialsCarousel/TestimonialsCarousel"; 
import "./Home.css"; 

function Home() {
  const navigate = useNavigate();

  // State for modals
  // const [showModal, setShowModal] = useState(false);
  // const [showTestimonials, setShowTestimonials] = useState(false);

  // Data for testimonials
  // const testimonialsData = [
  //   { name: "Jet R.", text: "This program changed my life!" },
  //   { name: "Ja'Quan B.", text: "An amazing experience, highly recommend." },
  //   { name: "Faust B.", text: "I learned so much and landed a job quickly!" },
  //   { name: "Amanda D.", text: "Typing weird stuff untill it works-that's the magic of coding!!" },
  // ];

  // const handleTestimonials = () => {
  //   setShowTestimonials(true);
  // };

  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <FeaturesSection />

      {/* Features Buttons */}
      <div className="features-buttons">
        <button className="accent-button">
          Start Your Journey
        </button>
        <button className="accent-button">
          Meet Our Mentors
        </button>
        <button className="accent-button">
          Testimonials
        </button>
      </div>

      {/* Experience Modal Pop-out */}
      {/* {showModal && (
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
      )} */}

      {/* Testimonials Carousel instead of Modal */}
      {/* {showTestimonials && (
        <TestimonialsCarousel
          testimonials={testimonialsData}
          onClose={() => setShowTestimonials(false)}
        />
      )} */}

    </div>
  );
}

export default Home;
