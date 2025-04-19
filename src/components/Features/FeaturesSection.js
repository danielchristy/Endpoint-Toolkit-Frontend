// src/components/Features/FeaturesSection.js
import React from 'react';
import Carousel from './Carousel';
import './FeaturesSection.css';

export default function FeaturesSection() {
  const featureCards = [
    <div className="feature-card card-one" key="1">
      <h3>Strategic Industry Partnerships</h3>
      <p>
        At Base Camp, we team up with leading tech innovators to bridge classroom
        learning with real‑world experience—empowering your journey from student
        to professional.
      </p>
    </div>,
    <div className="feature-card card-two" key="2">
      <h3>Expert‑Led Curriculum</h3>
      <p>
        Our courses are crafted by seasoned industry experts dedicated to nurturing
        talent and inspiring the next generation of software engineers.
      </p>
    </div>,
    <div className="feature-card card-three" key="3">
      <h3>Hands‑On Software Engineering</h3>
      <p>
        Engage in project‑based learning that takes you from coding fundamentals to
        full‑stack development, ensuring you’re ready to solve real‑world challenges.
      </p>
    </div>
  ];

  return (
    <section className="features-section">
      <Carousel items={featureCards} />
    </section>
  );
}


