import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import TestiimonialsSection from "../../components/Testimonials/TestimonialsSection"; 
import "./Home.css"; 

function Home() {
  return (
    <div className="landing-page">
      <Header />
      <TestiimonialsSection />
      <Hero />
    </div>
  );
}

export default Home;
