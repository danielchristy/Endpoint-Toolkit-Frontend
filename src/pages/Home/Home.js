import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import FeaturesSection from "../../components/Features/FeaturesSection"; 
import "./Home.css"; 

function Home() {
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
    </div>
  );
}

export default Home;
