// src/components/Features/FeaturesSection.js
import React from 'react';
import './FeaturesSection.css';

function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="feature-card">
          <h4>Enduring Partnerships</h4>
          <p>
            Imagine us in the trenches with you offering warm, rigorous,
            and ambitious collaboration for your high-stakes mission.
          </p>
        </div>

        <div className="feature-card">
          <h4>Domain Expertise</h4>
          <p>
            We can’t predict what you need next, but we can bring our years
            of workforce technology insights to help you uncover elegant
            solutions that last.
          </p>
        </div>

        <div className="feature-card">
          <h4>Full-Stack Solutions</h4>
          <p>
            A 12-person powerhouse skilled to discover, design, develop,
            and deploy transformative user experiences with emerging
            technologies—on time, every time.
          </p>
        </div>
      </div>
    </section>
  );
}
 
 export default FeaturesSection;


