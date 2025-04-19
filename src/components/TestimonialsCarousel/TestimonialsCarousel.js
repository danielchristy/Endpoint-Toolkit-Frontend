// TestimonialsCarousel.js
import React, { useState } from "react";
import "./TestimonialsCarousel.css";

function TestimonialsCarousel({ testimonials, onClose }) {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const nextTestimonial = () => {
    setActive((active + 1) % total);
  };

  const prevTestimonial = () => {
    setActive((active - 1 + total) % total);
  };

  return (
    <div className="modal-overlay">
      <div className="modal testimonials-carousel-modal">
        <h2>What Our Graduates Say</h2>
        <div className="carousel-content">
          <div className="carousel-item active">
            <p>"{testimonials[active].text}"</p>
            <p>
              <em>— {testimonials[active].name}</em>
            </p>
          </div>
        </div>
        <button className="carousel-button left" onClick={prevTestimonial}>
          &#10094;
        </button>
        <button className="carousel-button right" onClick={nextTestimonial}>
          &#10095;
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
